import { CustomerNameTooLongException } from "./CustomerNameTooLongException";
import { CustomerNameEmptyException } from "./CustomerNameEmptyException";

export { CustomerName }

class CustomerName {
    constructor(name) {
        if (name instanceof CustomerName) {
            name = name.value;
        } else {
            if (typeof name !== 'string') {
                throw new TypeError('Customer name: expected string but `' + (typeof name) + '` received');
            }
            name = name.trim();
            if (!name.length) {
                throw new CustomerNameEmptyException();
            }
            if (CustomerName.maxLength() <= name.length) {
                throw new CustomerNameTooLongException(name);
            }
        }
        this.value = name;
    }
    static create(value = null) {
        return new CustomerName(value);
    }
    static maxLength() {
        return 255;
    }
}
