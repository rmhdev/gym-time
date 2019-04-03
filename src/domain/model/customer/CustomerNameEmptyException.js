export { CustomerNameEmptyException }

class CustomerNameEmptyException extends Error {
    constructor() {
        super('Customer name is empty');
        this.name = "CustomerNameEmptyException";
        if (Error.hasOwnProperty('captureStackTrace')) {
            Error.captureStackTrace(this, this.constructor);
        }
        this.stack = (new Error()).stack;
    }
}
