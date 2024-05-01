class DBApi {
    constructor() {
        if (!localStorage.contactsDB) {
            localStorage.contactsDB = JSON.stringify({ users: [], contacts: [] });
        }
    }


    // CRUD for users managment

    createUser(username, password, firstName, lastName, phone, address) {
        const db = JSON.parse(localStorage.contactsDB);
        if (!this.readUser(username)) {
            db.users.push({ [username]: [{ password }, { firstName }, { lastName }, { phone }, { address }] });
            localStorage.contactsDB = JSON.stringify(db);
            return true;
        }
        return false;
    }

    readUsers() {
        const db = JSON.parse(localStorage.contactsDB);
        return db.users || [];
    }

    readUser(username) {
        const db = JSON.parse(localStorage.contactsDB);
        return db.users.find(user => Object.keys(user)[0] === username) || null;
    }

    updateUser(username, newPassword, newFirstName, newLastName, newPhoneNumber, newAddress) {
        const db = JSON.parse(localStorage.contactsDB);
        const userIndex = db.users.findIndex(user => Object.keys(user)[0] === username);
        if (userIndex !== -1) {
            if (newPassword) db.users[userIndex][username][0].password = newPassword;
            if (newFirstName) db.users[userIndex][username][1].firstname = newFirstName;
            if (newLastName) db.users[userIndex][username][2].lastname = newLastName;
            if (newPhoneNumber) db.users[userIndex][username][3].phoneNumber = newPhoneNumber;
            if (newAddress) db.users[userIndex][username][4].address = newAddress;
            localStorage.contactsDB = JSON.stringify(db);
            return true;
        }
        return false;
    }

    deleteUser(username) {
        const db = JSON.parse(localStorage.contactsDB);
        const userIndex = db.users.findIndex(user => Object.keys(user)[0] === username);
        if (userIndex !== -1) {
            db.users.splice(userIndex, 1);
            // Also delete all contacts associated with this user
            db.contacts = db.contacts.filter(contact => Object.keys(contact)[0] !== username);
            localStorage.contactsDB = JSON.stringify(db);
            return true;
        }
        return false;
    }


    // CRUD for contacts managment

    createContact(username, contactName, phoneNumber) {
        const db = JSON.parse(localStorage.contactsDB);
        if (!this.readContact(username, contactName)) {
            db.contacts.push({ [username]: [{ [contactName]: phoneNumber }] });
            localStorage.contactsDB = JSON.stringify(db);
            return true;
        }
        return false;
    }

    readContacts(username) {
        const db = JSON.parse(localStorage.contactsDB);
        return db.contacts.filter(entry => Object.keys(entry)[0] === username) || [];
    }

    readContact(username, contactName) {
        const db = JSON.parse(localStorage.contactsDB);
        const contacts = db.contacts.find(entry => Object.keys(entry)[0] === username);
        return contacts ? contacts[username].find(contact => Object.keys(contact)[0] === contactName) : null;
    }

    updateContact(username, contactName, newPhoneNumber) {
        const db = JSON.parse(localStorage.contactsDB);
        const contactIndex = db.contacts.findIndex(entry => Object.keys(entry)[0] === username && Object.keys(entry[username][0])[0] === contactName);
        if (contactIndex !== -1) {
            db.contacts[contactIndex][username][0][contactName] = newPhoneNumber;
            localStorage.contactsDB = JSON.stringify(db);
            return true;
        }
        return false;
    }

    deleteContact(username, contactName) {
        const db = JSON.parse(localStorage.contactsDB);
        const contactIndex = db.contacts.findIndex(entry => Object.keys(entry)[0] === username && Object.keys(entry[username][0])[0] === contactName);
        if (contactIndex !== -1) {
            db.contacts.splice(contactIndex, 1);
            localStorage.contactsDB = JSON.stringify(db);
            return true;
        }
        return false;
    }
}