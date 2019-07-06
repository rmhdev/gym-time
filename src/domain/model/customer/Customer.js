import { CustomerId } from "./CustomerId";
import { CustomerName } from "./CustomerName";
import {CustomerStatus} from "./CustomerStatus";

export { Customer }

class Customer {
    constructor(id, name = '', checkIn = null, checkOut = null, category = '') {
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
        if (typeof category !== 'string') {
            throw new TypeError('Customer category: expected `string`, got `' + (typeof category) + '`');

        }
        this.category = category;
    }
    checkIn() {
        return new Date(this.checkInTimestamp);
    }
    checkOut() {
        return this.checkOutTimestamp ? new Date(this.checkOutTimestamp) : null;
    }
    update(values) {
        let newValues = {
            name: this.name,
            checkout: this.checkOut(),
            category: this.category
            ,
            ...values
        };

        if (newValues.checkout instanceof Date) {
            if (newValues.checkout <= this.checkIn()) {
                throw new TypeError(
                    'Customer: checkout must happen after checkin. '
                    + '(out) ' + newValues.checkout.toISOString()
                    + ' <= '
                    + '(in) ' + this.checkIn().toISOString()
                );
            }
        } else if (null !== newValues.checkout) {
            throw new TypeError('Update checkout: expected Date or null, got `' + (typeof newValues.checkout) + '`');
        }

        return new Customer(this.id, newValues.name, this.checkIn(), newValues.checkout, newValues.category);
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
