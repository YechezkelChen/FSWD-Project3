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

        const network = new Network();
        const data = this.data;
        if (this.data.async) {
            network.sendToServerAsync(JSON.stringify({ data, body }), (response) => {
                this.responseHeaders = response.headers;
                this.response = response.body;
                this.readyState = FXMLHttpRequest.DONE;
                this.dispatchEvent(new Event('readystatechange'));
                this.dispatchEvent(new Event('load'));
                this.dispatchEvent(new Event('loadend'));
                func();
            });

        } else {
            response = network.sendToServer(JSON.stringify({ data, body }))
            this.responseHeaders = response.headers;
            this.response = response.body;
            this.readyState = FXMLHttpRequest.DONE;
            this.dispatchEvent(new Event('readystatechange'));
            this.dispatchEvent(new Event('load'));
            this.dispatchEvent(new Event('loadend'));
            func();
        }
    }
}