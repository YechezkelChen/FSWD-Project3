class Network {
    constructor() {
        this.server = new Server();
    }

    sendToServerAsync(request, dispatcher) {
        this.server.handleRequest(request, dispatcher);
    }

    sendToServer(request) {
        let response = this.server.handleRequest(request);
        return response;
    }
}