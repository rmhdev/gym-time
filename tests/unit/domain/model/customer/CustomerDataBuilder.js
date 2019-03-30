import { Customer } from "@/domain/model/customer/Customer";
import { CustomerIdDataBuilder } from "./CustomerIdDataBuilder";
import { CustomerName } from "../../../../../src/domain/model/customer/CustomerName";

export { CustomerDataBuilder }

class CustomerDataBuilder {
    constructor() {
        this.id = CustomerIdDataBuilder.aCustomerId().build();
        this.name = CustomerName.create('My Name');
        this.checkIn = '2019-03-19T12:00:00.000Z';
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
    build() {
        return new Customer(this.id, this.name, this.checkIn);
    }
    static aCustomer() {
        return new CustomerDataBuilder();
    }
}
