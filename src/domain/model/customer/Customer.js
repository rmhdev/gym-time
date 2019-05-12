import { CustomerId } from "./CustomerId";
import { CustomerName } from "./CustomerName";
import {CustomerStatus} from "./CustomerStatus";
import {CustomerCategory} from "./CustomerCategory";

export { Customer }

class Customer {
    constructor(id, name = '', checkIn = null, checkOut = null, category = null) {
        this.id = new CustomerId(id);
        this.name = new CustomerName(name);
        this.checkInTimestamp = (checkIn instanceof Date) ? checkIn.getTime() : Date.now();
        let out = null;
        if (checkOut instanceof Date) {
            out = checkOut.getTime();
        } else if (typeof checkOut === 'string' || Number.isInteger(checkOut)) {
            out = (new Date(checkOut)).getTime();
        }
        this.checkOutTimestamp = out;
        this.category = (category instanceof CustomerCategory) ? category : null;
    }
    checkIn() {
        return new Date(this.checkInTimestamp);
    }
    checkOut() {
        return this.checkOutTimestamp ? new Date(this.checkOutTimestamp) : null;
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
        } else if (null !== checkoutDate) {
            throw new TypeError('UpdateCheckout: expected Date or null, got `' + (typeof name) + '`');
        }
        return new Customer(this.id, this.name, this.checkIn(), checkoutDate, this.category);
    }
    status() {
        if (this.checkOutTimestamp) {
            return CustomerStatus.createOut();
        }
        return CustomerStatus.createActive();
    }
    static create(name = '', category = null) {
        return new Customer(CustomerId.create(), name, null, null, category);
    }
}
