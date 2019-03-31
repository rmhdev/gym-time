export { CustomerNoFoundException }

class CustomerNoFoundException extends Error {
    constructor(message = '') {
        super(message);
        this.name = "CustomerNotFoundException";
        if (Error.hasOwnProperty('captureStackTrace')) {
            Error.captureStackTrace(this, this.constructor);
        }
        this.stack = (new Error()).stack;
    }
}
