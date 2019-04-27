export { CustomerTypeException }

class CustomerTypeException extends Error {
    constructor(message = '') {
        super(message);
        this.name = "CustomerTypeException";
        if (Error.hasOwnProperty('captureStackTrace')) {
            Error.captureStackTrace(this, this.constructor);
        }
        this.stack = (new Error()).stack;
    }
}
