let fxhr;

// Open a POST request to create a new user
fxhr = new FXMLHttpRequest();
const newUser = {
    username: 'new_user',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '1234567890',
    address: '123 Main St'
};
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


// Open a GET request to retrieve usernames
fxhr = new FXMLHttpRequest();
fxhr.open('GET', '/users');
fxhr.onload = function () {
    if (fxhr.status >= 200 && fxhr.status < 300) {
        const usernames = JSON.parse(fxhr.responseText);
        console.log('Usernames:', usernames);
    } else {
        console.error('Failed to retrieve usernames:', fxhr.statusText);
    }
};
fxhr.send();


// Open a GET request to retrieve a specific user
fxhr = new FXMLHttpRequest();
const username = 'new_user';
fxhr.open('GET', `/user`, true, username);
fxhr.onload = function () {
    if (fxhr.status >= 200 && fxhr.status < 300) {
        const user = JSON.parse(fxhr.responseText);
        console.log('User:', user);
    } else {
        console.error('Failed to retrieve user:', fxhr.statusText);
    }
};
fxhr.send();

// Open a PUT request to update user information
fxhr = new FXMLHttpRequest();
const updatedUserInfo = {
    newPassword: 'new_password',
    newFirstName: 'Jane',
    newLastName: 'Doe',
    newPhoneNumber: '0987654321',
    newAddress: '456 Elm St'
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

// Open a DELETE request to delete a user
fxhr = new FXMLHttpRequest();
fxhr.open('DELETE', '/user', true, 'new_user');
fxhr.onload = function () {
    if (fxhr.status >= 200 && fxhr.status < 300) {
        console.log('User deleted successfully');
    } else {
        console.error('Failed to delete user:', fxhr.statusText);
    }
};
fxhr.send();

// Open a POST request to create a new contact
fxhr = new FXMLHttpRequest();
const newContact = {
    username: 'new_user',
    contactName: 'new_contact',
    phoneNumber: '9876543210'
};
fxhr.open('POST', '/contact', true, 'new_user');
fxhr.setRequestHeader('Content-Type', 'application/json');
fxhr.onload = function () {
    if (fxhr.status >= 200 && fxhr.status < 300) {
        console.log('New contact created successfully');
    } else {
        console.error('Failed to create contact:', fxhr.statusText);
    }
};
fxhr.send(JSON.stringify(newContact));

// Open a GET request to retrieve contacts
fxhr = new FXMLHttpRequest();
fxhr.open('GET', '/contacts', true, 'new_user');
fxhr.onload = function () {
    if (fxhr.status >= 200 && fxhr.status < 300) {
        const contacts = JSON.parse(fxhr.responseText);
        console.log('Contacts:', contacts);
    } else {
        console.error('Failed to retrieve contacts:', fxhr.statusText);
    }
};
fxhr.send();

// Open a GET request to retrieve a specific contact
fxhr = new FXMLHttpRequest();
const contactName = 'new_contact';
fxhr.open('GET', '/contact', true, 'new_user');
fxhr.onload = function () {
    if (fxhr.status >= 200 && fxhr.status < 300) {
        const phoneNumber = JSON.parse(fxhr.responseText);
        console.log(`Phone number of ${contactName}:`, phoneNumber);
    } else {
        console.error('Failed to retrieve contact:', fxhr.statusText);
    }
};
fxhr.send(JSON.stringify({ contactName: 'new_contact' }));

// Open a PUT request to update contact information
fxhr = new FXMLHttpRequest();
const updatedContactInfo = {
    contactName: 'new_contact',
    newPhoneNumber: '1234567890'
};
fxhr.open('PUT', `/contact`, true, 'new_user');
fxhr.setRequestHeader('Content-Type', 'application/json');
fxhr.onload = function () {
    if (fxhr.status >= 200 && fxhr.status < 300) {
        console.log('Contact information updated successfully');
    } else {
        console.error('Failed to update contact information:', fxhr.statusText);
    }
};
fxhr.send(JSON.stringify(updatedContactInfo));

// Open a DELETE request to delete a contact
fxhr = new FXMLHttpRequest();
fxhr.open('DELETE', `/contact`, true, 'new_user')
fxhr.onload = function () {
    if (fxhr.status >= 200 && fxhr.status < 300) {
        console.log('Contact deleted successfully');
    } else {
        console.error('Failed to delete contact:', fxhr.statusText);
    }
};
fxhr.send(JSON.stringify({ contactName: 'new_contact' }));
