function showContent(element_id) {
    let temp = document.getElementById(element_id);
    let clon = temp.content.cloneNode(true);
    const parent = document.getElementById("container");
    parent.appendChild(clon);

}

function hideContent(element_id) {
    const parent = document.getElementById("container");
    const child = document.getElementById(element_id);
    parent.removeChild(child);

}

document.addEventListener('DOMContentLoaded', function() {
    showContent("template_entrence");

    const signup_button = document.getElementById("button_sign_up");
    signup_button.addEventListener('click', function() {
        hideContent("div_entrence1");
        showContent("template_sign_up");
        signup()
    });

    const login_button = document.getElementById("button_login");
    login_button.addEventListener('click', function() {
        hideContent("div_entrence1");
        showContent("template_login");
        login()
    });
});


function signup() {
    const sign_up_buttom = document.getElementById("sign_up_button");

    sign_up_buttom.addEventListener('click', () => {
        const fxhr = new FXMLHttpRequest();

        const newUser = {
            username: document.getElementById("signup_username").value,
            password: document.getElementById("signup_password").value,
            firstName: document.getElementById("signup_first_name").value,
            lastName: document.getElementById("signup_last_name").value,
            phoneNumber: document.getElementById("signup_phone_number").value,
            address: document.getElementById("signup_address").value
        };

        console.log(newUser)
        fxhr.open('POST', '/user', true, '');
        fxhr.setRequestHeader('Content-Type', 'application/json');
        fxhr.onload = function () {
            if (fxhr.status >= 200 && fxhr.status < 300) {
                console.log('New user created successfully');
            } else {
                console.error('Failed to create user:', fxhr.statusText);
            }
        };
        fxhr.send(JSON.stringify(newUser));

        hideContent("div_sign_up");
        showContent("template_login");
    })
}

function login() {
    const log_in_buttom = document.getElementById("log_in_button");
    log_in_buttom.addEventListener('click', () => {
        const fxhr = new FXMLHttpRequest();
        const username = document.getElementById("login_username").value;
        const password = document.getElementById("login_password").value;

        let user = null;
        fxhr.open('GET', `/user`, true, username);
        fxhr.onload = function () {
            if (fxhr.status >= 200 && fxhr.status < 300) {
                user = JSON.parse(fxhr.responseText);
                console.log('User:', user);
            } else {
                console.error('Failed to retrieve user:', fxhr.statusText);
            }
        };
        fxhr.send();

        hideContent("div_login");
        showContent("template_contacts_list");
        getContacts(user.username);
        // alert(user)
        // if (user && user.password === password)
        // {
        //     alert("jhvblk;l,;oilh")
        //     //showContent("");
        // }
        // else
        // {
        //     alert("your username or password inccorect")
        // }
    })
}


function getContacts(username) {
    const templateContactsList = document.getElementById("template_contacts_list");
    // const fxhr = new FXMLHttpRequest();
    // const newContact = {
    //     username: 'a',
    //     contactName: 'new_contact',
    //     phoneNumber: '9876543210'
    // };
    // fxhr.open('POST', '/contact', true, 'a');
    // fxhr.setRequestHeader('Content-Type', 'application/json');
    // fxhr.onload = function () {
    //     if (fxhr.status >= 200 && fxhr.status < 300) {
    //         console.log('New contact created successfully');
    //     } else {
    //         console.error('Failed to create contact:', fxhr.statusText);
    //     }
    // };
    // fxhr.send(JSON.stringify(newContact));

    templateContactsList.addEventListener('load', () => {
        const fxhr = new FXMLHttpRequest();

        let contacts = null;
        fxhr.open('GET', '/contacts', true, username);
        fxhr.onload = function () {
            if (fxhr.status >= 200 && fxhr.status < 300) {
                contacts = JSON.parse(fxhr.responseText);
                console.log('Contacts:', contacts);
            } else {
                console.error('Failed to retrieve contacts:', fxhr.statusText);
            }
        };
        fxhr.send();


        const divContactList = document.getElementById("div_contacts_list");
        divContactList.innerHTML = "";

        contacts.forEach(contact => {
            const contactItem = document.createElement("div");
            contactItem.classList.add("contact-item");
            contactItem.innerHTML = `
                <span>${contact.name}</span>
                <span>${contact.phone}</span>
                <button onclick="deleteContact(${contact.id})" class="btn btn-delete">Delete</button>
            `;
            divContactList.appendChild(contactItem);


            // hideContent("Sign_up1");
            // hideContent("Sign_up2");
            // showContent("Login1");
            // showContent("Login2");
        })
    })
}
