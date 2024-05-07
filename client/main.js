let connectedUsername = null;
let fxhr = null;

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

document.addEventListener('DOMContentLoaded', function () {
    showContent("template_entrence");

    const signup_button = document.getElementById("button_sign_up");
    signup_button.addEventListener('click', function () {
        hideContent("div_entrence1");
        showContent("template_sign_up");
        signup()
    });

    const login_button = document.getElementById("button_login");
    login_button.addEventListener('click', function () {
        hideContent("div_entrence1");
        showContent("template_login");
        login()
    });
});

function signup() {
    const sign_up_buttom = document.getElementById("sign_up_button");

    sign_up_buttom.addEventListener('click', () => {
        fxhr = new FXMLHttpRequest();

        if (!document.getElementById("signup_username").value || !document.getElementById("signup_password").value || !document.getElementById("signup_first_name").value || !document.getElementById("signup_last_name").value || !document.getElementById("signup_phone_number").value || !document.getElementById("signup_address").value) {
            alert("Inccorect details");
        }

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
        fxhr = new FXMLHttpRequest();

        if (!document.getElementById("login_username").value || !document.getElementById("login_password").value) {
            alert("Inccorect details");
        }

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

        if (user && user[username][0].password === password) {
            connectedUsername = username;
            hideContent("div_login");
            getContacts();
        }
        else {
            alert("your username or password inccorect")
        }
    })
}

function getContacts() {
    showContent("template_contacts_list");

    fxhr = new FXMLHttpRequest();

    let contacts = null;
    fxhr.open('GET', '/contacts', true, connectedUsername);
    fxhr.onload = function () {
        if (fxhr.status >= 200 && fxhr.status < 300) {
            contacts = JSON.parse(fxhr.responseText);
            console.log('Contacts:', contacts);
        } else {
            console.error('Failed to retrieve contacts:', fxhr.statusText);
        }
    };
    fxhr.send();

    const tableContainer = document.getElementById('div_contacts_list');
    tableContainer.innerHTML += generateContactsTable(contacts);
}

function generateContactsTable(contacts) {
    let table = '<table>';
    table += '<tr><th>Name</th><th>Phone Number</th><th>    </th></tr>';
    contacts.forEach(contact => {
        for (const contactName in contact[connectedUsername][0])
            table += `<tr><td><input id='contactName' type='text' value='${contactName}'></td><td><input id='contactPhoneNumber' type='text' value='${contact[connectedUsername][0][contactName]}'</td><td><button onclick="editContact()">Edit Contact</button></td><td><button onclick="removeContact()">Remove Contact</button></td></tr>`;
    });
    table += '</table>';
    return table;
}

function addContact() {
    hideContent("div_contacts_list")
    showContent("templateAddContact")

    const addContactButton = document.getElementById("addContact");
    addContactButton.addEventListener('click', function () {
        fxhr = new FXMLHttpRequest();
        const newContact = {
            username: connectedUsername,
            contactName: document.getElementById("addContactName").value,
            phoneNumber: document.getElementById("addContactPhoneNumber").value
        };

        fxhr.open('POST', '/contact', true, connectedUsername);
        fxhr.setRequestHeader('Content-Type', 'application/json');
        fxhr.onload = function () {
            if (fxhr.status >= 200 && fxhr.status < 300) {
                console.log('New contact created successfully');
            } else {
                console.error('Failed to create contact:', fxhr.statusText);
            }
        };
        fxhr.send(JSON.stringify(newContact));

        hideContent("divAddContact");
        getContacts();
    });
}

function editContact() {
    fxhr = new FXMLHttpRequest();
    const updatedContactInfo = {
        contactName: document.getElementById("contactName").value,
        newPhoneNumber: document.getElementById("contactPhoneNumber").value
    };

    fxhr.open('PUT', `/contact`, true, connectedUsername);
    fxhr.setRequestHeader('Content-Type', 'application/json');
    fxhr.onload = function () {
        if (fxhr.status >= 200 && fxhr.status < 300) {
            console.log('Contact information updated successfully');
        } else {
            console.error('Failed to update contact information:', fxhr.statusText);
        }
    };
    fxhr.send(JSON.stringify(updatedContactInfo));

    hideContent("div_contacts_list")
    getContacts()
}

function removeContact() {
    console.log("remove")

    fxhr = new FXMLHttpRequest();
    fxhr.open('DELETE', `/contact`, true, connectedUsername)
    fxhr.onload = function () {
        if (fxhr.status >= 200 && fxhr.status < 300) {
            console.log('Contact deleted successfully');
        } else {
            console.error('Failed to delete contact:', fxhr.statusText);
        }
    };
    fxhr.send(JSON.stringify({ contactName: 'user' }));

    hideContent("div_contacts_list")
    getContacts()
}

function generateUsersTable(data) {
    let table = '<table>';
    table += '<tr><th>First Name</th><th>Last Name</th><th>Phone Number</th><th>Address</th></tr>';
    data.forEach(item => {
        table += `<tr><td>${item.firstName}</td><td>${item.lastName}</td><td>${item.phoneNumber}</td><td>${item.address}</td></tr>`;
    });
    table += '</table>';
    return table;
}

function editPersonalDetails() {
    hideContent("div_contacts_list");
    showContent("template_edit_user_details");

    const editUserButton = document.getElementById("editUserButton");
    editUserButton.addEventListener('click', function () {
        fxhr = new FXMLHttpRequest();
        const updatedUserInfo = {
            newPassword: document.getElementById("edit_password").value,
            newFirstName: document.getElementById("edit_first_name").value,
            newLastName: document.getElementById("edit_last_name").value,
            newPhoneNumber: document.getElementById("edit_phone_number").value,
            newAddress: document.getElementById("edit_address").value
        };
        fxhr.open('PUT', `/user`, true, 'new_user');
        fxhr.setRequestHeader('Content-Type', 'application/json');
        fxhr.onload = function () {
            if (fxhr.status >= 200 && fxhr.status < 300) {
                console.log('User information updated successfully');
            } else {
                console.error('Failed to update user information:', fxhr.statusText);
            }
        };
        fxhr.send(JSON.stringify(updatedUserInfo));

        hideContent("div_edit_user_details");
        getContacts();
    });
}