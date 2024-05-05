class Server {
    constructor() {
        this.dbApi = new DBApi();
    }

    handleRequest(request, dispatcher = (x) => { }) {
        const parsedRequest = JSON.parse(request);

        const requestData = parsedRequest.data;
        const method = requestData.method.toUpperCase();
        const url = requestData.url;
        const username = requestData.username;

        const requestBody = parsedRequest.body;

        let responseText = null;
        switch (method) {
            case 'GET':
                responseText = this.handleGetRequest(url, username, requestBody);
                break;
            case 'POST':
                responseText = this.handlePostRequest(url, username, requestBody);
                break;
            case 'PUT':
                responseText = this.handlePutRequest(url, username, requestBody);
                break;
            case 'DELETE':
                responseText = this.handleDeleteRequest(url, username, requestBody);
                break;
            default:
                return "false";
        }

        let response = null;
        if (responseText === false || responseText === null || responseText == [])
            response = {
                text: JSON.stringify(responseText),
                status: 400,
            }
        else
            response = {
                text: JSON.stringify(responseText),
                status: 200,
            }

        dispatcher(response);
    }

    handleGetRequest(url, username, body) {
        switch (url) {
            case '/users':
                return this.dbApi.readUsers();
            case '/user':
                return this.dbApi.readUser(username);
            case '/contacts':
                return this.dbApi.readContacts(username);
            case '/contact':
                const { contactName } = body;
                return this.dbApi.readContact(username, contactName);
            default:
                return null;
        }
    }

    handlePostRequest(url, username, body) {
        const { phoneNumber } = body
        switch (url) {
            case '/user':
                const { username: newUsername, password, firstName, lastName, address } = body;
                return this.dbApi.createUser(newUsername, password, firstName, lastName, phoneNumber, address);
            case '/contact':
                const { contactName } = body;
                return this.dbApi.createContact(username, contactName, phoneNumber);
            default:
                return null;
        }
    }

    handlePutRequest(url, username, body) {
        const { newPhoneNumber } = body;
        switch (url) {
            case '/user':
                const { newPassword, newFirstName, newLastName, newAddress } = body;
                return this.dbApi.updateUser(username, newPassword, newFirstName, newLastName, newPhoneNumber, newAddress);
            case '/contact':
                const { contactName } = body;
                return this.dbApi.updateContact(username, contactName, newPhoneNumber);
            default:
                return null;
        }
    }

    handleDeleteRequest(url, username, body) {
        switch (url) {
            case '/user':
                return this.dbApi.deleteUser(username);
            case '/contact':
                const { contactName } = body;
                return this.dbApi.deleteContact(username, contactName);
            default:
                return null;
        }
    }
}