import { CustomerName } from "./CustomerName";

export { CustomerNameTooLongException }

class CustomerNameTooLongException extends Error {
    constructor(name = '') {
        super(
            'Name "'
            + name.substr(0, 10)
            + '..." is too long ('
            + name.length
            + ' chars), max is '
            + CustomerName.maxLength()
        );
        this.name = "CustomerNameTooLongException";
        if (Error.hasOwnProperty('captureStackTrace')) {
            Error.captureStackTrace(this, this.constructor);
        }
        this.stack = (new Error()).stack;
    }
}
