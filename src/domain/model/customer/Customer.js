import { CustomerId } from "./CustomerId";
import { CustomerName } from "./CustomerName";

export { Customer }

class Customer {
    constructor(id, name = '', checkIn = null) {
        this.id = new CustomerId(id);
        this.name = new CustomerName(name);
        this.checkInTimestamp = (checkIn instanceof Date) ? checkIn.getTime() : Date.now();
    }
    checkIn() {
        return new Date(this.checkInTimestamp);
    }
    static create(name = '') {
        return new Customer(CustomerId.create(), name);
    }
}
