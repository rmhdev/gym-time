import { Customer } from "@/domain/model/customer/Customer";
import { CustomerName } from "@/domain/model/customer/CustomerName";
import { CustomerId } from "@/domain/model/customer/CustomerId";

export { CustomerDataBuilder }

class CustomerDataBuilder {
    constructor() {
        this.id = CustomerId.create('123456qwerty');
        this.name = CustomerName.create('My Name');
        this.checkIn = '2019-03-19T12:00:00.000Z';
        this.checkOut = null;
    }
    withId(id) {
        this.id = id;

        return this;
    }
    withName(name) {
        this.name = name;

        return this;
    }
    withCheckIn(checkIn) {
        this.checkIn = checkIn;

        return this;
    }
    withCheckOut(checkOut) {
        this.checkOut = checkOut;

        return this;
    }
    build() {
        return new Customer(this.id, this.name, new Date(this.checkIn), this.checkOut);
    }
    static aCustomer() {
        return new CustomerDataBuilder();
    }
}
