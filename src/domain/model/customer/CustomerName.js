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
            name = name
                .replace(/[´`~¡!@#$%^&*()_|+\-=¿?;:'",.<>{}[\]\\/]/g, '')
                .replace(/\s\s+/g, ' ')
                .trim()
            ;
            if (!name.length) {
                throw new CustomerNameEmptyException();
            }
            if (CustomerName.maxLength() <= name.length) {
                throw new CustomerNameTooLongException(name);
            }
        }
        this.value = name;
    }
    initials() {
        return String.fromCodePoint(this.value.codePointAt(0)).toUpperCase();
    }
    isSimilar(name = '') {
        try {
            return this.value.toLowerCase().includes((new CustomerName(name)).value.trim().toLowerCase());
        } catch (e) {
            return (e instanceof CustomerNameEmptyException);
        }
    }
    static create(value = null) {
        return new CustomerName(value);
    }
    static maxLength() {
        return 255;
    }
}
