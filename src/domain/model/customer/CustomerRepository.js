import { Customer } from '@/domain/model/customer/Customer'

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
}
