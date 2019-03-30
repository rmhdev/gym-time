import { CustomerId } from "./CustomerId";

export { Customer }

class Customer {
    constructor(id, name = '', checkIn = null) {
        if (typeof name !== 'string') {
            throw new TypeError('Customer: name cannot be empty');
        }
        if (!name.length) {
            throw new TypeError('Customer: name cannot be empty');
        }
        this.id = new CustomerId(id);
        this.name = name;
        this.checkInTimestamp = (checkIn instanceof Date) ? checkIn.getTime() : Date.now();
    }
    checkIn() {
        return new Date(this.checkInTimestamp);
    }
}
