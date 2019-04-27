import { CustomerId } from "./CustomerId";
import { CustomerName } from "./CustomerName";
import {CustomerStatus} from "./CustomerStatus";

export { Customer }

class Customer {
    constructor(id, name = '', checkIn = null, checkOut = null) {
        this.id = new CustomerId(id);
        this.name = new CustomerName(name);
        this.checkInTimestamp = (checkIn instanceof Date) ? checkIn.getTime() : Date.now();
        this.checkOutTimestamp = (checkOut instanceof Date) ? checkOut.getTime() : null;
    }
    checkIn() {
        return new Date(this.checkInTimestamp);
    }
    checkOut() {
        return this.checkOutTimestamp ? new Date(this.checkOutTimestamp) : this.checkOutTimestamp;
    }
    updateCheckOut(checkoutDate) {
        if (checkoutDate instanceof Date) {
            if (checkoutDate <= this.checkIn()) {
                throw new TypeError(
                    'Customer: checkout must happen after checkin. '
                    + '(out) ' + checkoutDate.toISOString()
                    + ' <= '
                    + '(in) ' + this.checkIn().toISOString()
                );
            }
        }
        return new Customer(this.id, this.name, this.checkIn(), checkoutDate);
    }
    status() {
        if (this.checkOutTimestamp) {
            return CustomerStatus.createOut();
        }
        return CustomerStatus.createActive();
    }
    static create(name = '') {
        return new Customer(CustomerId.create(), name);
    }
}
