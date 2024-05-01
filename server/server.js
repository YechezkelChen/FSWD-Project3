class Server {
    constructor() {
        this.dbApi = new DBApi();
    }

    handleRequest(request, dispatcher = (x) => { }) {
        const requestData = JSON.parse(request);
        const method = requestData.method.toUpperCase();
        const data = requestData.data;

        switch (method) {
            case 'GET':
                this.handleGetRequest(data, dispatcher);
                break;
            case 'POST':
                this.handlePostRequest(data, dispatcher);
                break;
            case 'PUT':
                this.handlePutRequest(data, dispatcher);
                break;
            case 'DELETE':
                this.handleDeleteRequest(data, dispatcher);
                break;
            default:
                return false;
        }
        return true;
    }

    handleGetRequest(data, dispatcher) {
        const { resource, username } = data;
        switch (resource) {
            case 'usernames':
                dispatcher(this.dbApi.getUsernames());
                break;
            case 'user':
                dispatcher(this.dbApi.readUser(username));
                break;
            case 'contacts':
                dispatcher(this.dbApi.readContacts(username));
                break;
            case 'contact':
                const { contactName } = data;
                dispatcher(this.dbApi.readContact(username, contactName));
                break;
            default:
                dispatcher(null);
        }
    }

    handlePostRequest(data, dispatcher) {
        const { resource, username } = data;
        switch (resource) {
            case 'usernames':
                const { password, firstName, lastName, phone, address } = data;
                dispatcher(this.dbApi.createUser(username, password, firstName, lastName, phone, address));
                break;
            case 'contacts':
                const { contactName, phoneNumber } = data;
                dispatcher(this.dbApi.createContact(username, contactName, phoneNumber));
                break;
            default:
                dispatcher();
        }
    }

    handlePutRequest(data, dispatcher) {
        const { resource, username, newPhoneNumber } = data;
        switch (resource) {
            case 'usernames':
                const { newPassword, newFirstName, newLastName, newAddress } = data;
                dispatcher(this.dbApi.updateUser(username, newPassword, newFirstName, newLastName, newPhoneNumber, newAddress));
                break;
            case 'contacts':
                const { contactName } = data;
                dispatcher(this.dbApi.updateContact(username, contactName, newPhoneNumber));
                break;
            default:
                dispatcher();
        }
    }

    handleDeleteRequest(data, dispatcher) {
        const { resource, username } = data;
        switch (resource) {
            case 'usernames':
                dispatcher(this.dbApi.deleteUser(username));
                break;
            case 'contacts':
                const { contactName } = data;
                dispatcher(this.dbApi.deleteContact(username, contactName));
                break;
            default:
                dispatcher();
        }
    }
}