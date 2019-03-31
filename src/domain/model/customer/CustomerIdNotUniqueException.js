export { CustomerIdNotUniqueException }

class CustomerIdNotUniqueException extends Error {
    constructor(message = '') {
        super(message);
        this.name = "CustomerIdNotUniqueException";
        if (Error.hasOwnProperty('captureStackTrace')) {
            Error.captureStackTrace(this, this.constructor);
        }
        this.stack = (new Error()).stack;
    }
}
