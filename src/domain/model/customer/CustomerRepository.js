import { Customer } from '@/domain/model/customer/Customer'
import { CustomerNoFoundException } from "@/domain/model/customer/CustomerNotFoundException";

export { CustomerRepository }

class CustomerRepository {
    constructor() {
        this.items = [];
    }
    count() {
        return this.items.length;
    }
    all() {
        return this.items;
    }
    add(customer) {
        if (customer === null) {
            throw new TypeError('CustomerRepository: cannot add a null item');
        }
        if (typeof customer !== 'object') {
            throw new TypeError('CustomerRepository: cannot add an item of type `' + (typeof customer) + '`');
        }
        if (customer.constructor.name !== Customer.name) {
            throw new TypeError('CustomerRepository: cannot add an object `' + customer.constructor.name + '`');
        }
        this.items.push(customer);
    }
    remove(id) {
        const index = this.items.findIndex((customer) => {
            return customer.id.equals(id);
        });
        if (-1 === index) {
            throw new CustomerNoFoundException('CustomerRepository: item with id `' + id.toString() + '` not found');
        }
        this.items.splice(index, 1);
    }
    findById(id) {
        const result = this.items.find((customer) => {
            return customer.id.equals(id);
        });
        if (result) {
            return result;
        }
        throw new CustomerNoFoundException('CustomerRepository: item with id `' + id.toString() + '` not found');
    }
}
