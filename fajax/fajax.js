class FXMLHttpRequest {
    // Constants
    static UNSENT = 0;
    static OPENED = 1;
    static HEADERS_RECEIVED = 2;
    static LOADING = 3;
    static DONE = 4;

    // Properties
    onabort = null;
    onerror = null;
    onload = null;
    onloadend = null;
    onloadstart = null;
    onprogress = null;
    onreadystatechange = null;
    ontimeout = null;

    requestHeaders = {};
    responseHeaders = {};
    readyState = FXMLHttpRequest.UNSENT;
    response = null;
    responseText = null;
    responseType = '';
    responseURL = '';
    responseXML = null;
    status = 0;
    statusText = '';
    timeout = 0;
    upload = null;
    withCredentials = false;

    constructor() {
        this.network = new Network();
    }

    // Functions
    abort() {
        if (this.readyState !== FXMLHttpRequest.UNSENT && this.readyState !== FXMLHttpRequest.DONE) {
            this.readyState = FXMLHttpRequest.UNSENT;
            this.dispatchEvent(new Event('abort'));
            this.dispatchEvent(new Event('loadend'));
        }
    }

    addEventListener(type, listener) {
        if (!(type in this)) {
            throw new Error(`Unsupported event type: ${type}`);
        }
        if (!this[type]) {
            this[type] = [];
        }
        this[type].push(listener);
    }

    removeEventListener(type, listener) {
        if (this[type]) {
            const index = this[type].indexOf(listener);
            if (index !== -1) {
                this[type].splice(index, 1);
            }
        }
    }

    dispatchEvent(event) {
        if (this[event.type]) {
            this[event.type].forEach(listener => {
                listener.call(this, event);
            });
        }
    }

    getAllResponseHeaders() {
        if (this.readyState < FXMLHttpRequest.HEADERS_RECEIVED) {
            return '';
        }
        return Object.keys(this.responseHeaders).map(key => `${key}: ${this.responseHeaders[key]}`).join('\r\n');
    }

    getResponseHeader(header) {
        if (this.readyState < FXMLHttpRequest.HEADERS_RECEIVED) {
            return null;
        }
        return this.responseHeaders[header] || null;
    }

    setRequestHeader(header, value) {
        if (this.readyState !== FXMLHttpRequest.OPENED) {
            throw new Error('Invalid state');
        }
        this.requestHeaders[header] = value;
    }

    open(method, url, async = true, username = null, password = null) {
        if (this.readyState !== FXMLHttpRequest.UNSENT) {
            throw new Error('Invalid state');
        }
        this.readyState = FXMLHttpRequest.OPENED;
        this.data = {
            method,
            url,
            async,
            username,
            password
        };
        this.dispatchEvent(new Event('readystatechange'));
    }

    overrideMimeType(mimeType) {
        this.responseType = mimeType;
    }

    send(body = "", func = () => { }) {
        if (this.readyState !== FXMLHttpRequest.OPENED) {
            throw new Error('Invalid state');
        }

        const data = this.data;
        if (body)
            body = JSON.parse(body)

        if (this.data.async) {
            this.network.sendToServerAsync(JSON.stringify({ data, body }), (response) => {
                this.processResponse(response, func);
            });

        } else {
            const response = this.network.sendToServer(JSON.stringify({ data, body }));
            this.processResponse(response, func);
        }
    }

    processResponse(response, callback) {
        this.responseText = response.text
        this.status = response.status
        this.readyState = FXMLHttpRequest.DONE;
        if (this.onreadystatechange) this.onreadystatechange()
        if (this.onload) this.onload()
        if (this.onloadend) this.onloadend()
        callback();
    }
}