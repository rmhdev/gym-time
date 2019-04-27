import { Customer } from '@/domain/model/customer/Customer'
import { CustomerNoFoundException } from "@/domain/model/customer/CustomerNotFoundException";
import { CustomerIdNotUniqueException } from "@/domain/model/customer/CustomerIdNotUniqueException";
import { CustomerTypeException } from "./CustomerTypeException";

export { CustomerRepository }

class CustomerRepository {
    constructor() {
        this.items = [];
    }
    count() {
        return this.items.length;
    }
    all() {
        this.items.sort(function (a, b) {
            // Latter is first
            if (a.checkIn() < b.checkIn()) {
                return 1;
            }
            if (a.checkIn() > b.checkIn()) {
                return -1;
            }
            return 0;
        });

        return this.items;
    }
    add(customer) {
        if (customer === null) {
            throw new CustomerTypeException('CustomerRepository::add, null item');
        }
        if (typeof customer !== 'object') {
            throw new CustomerTypeException('CustomerRepository::add, incorrect type `' + (typeof customer) + '`');
        }
        if (customer.constructor.name !== Customer.name) {
            throw new CustomerTypeException('CustomerRepository::add, incorrect object `' + customer.constructor.name + '`');
        }
        try {
            this.findById(customer.id);
        } catch (CustomerNotFoundException) {
            this.items.push(customer);
            return;
        }
        throw new CustomerIdNotUniqueException(
            'CustomerRepository: cannot add customer with id `' + '´ because it already exists'
        );
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
    update(customer) {
        if (!(customer instanceof Customer)) {
            throw new CustomerTypeException(
                'CustomerRepository::update, expected Customer, got ' + (typeof customer)
            );
        }
        const index = this.items.findIndex((item) => {
            return item.id.equals(customer.id);
        });
        if (index === -1) {
            throw new CustomerNoFoundException(
                'CustomerRepository: unable to update customer with id `' + customer.id.value + '`: not found'
            )
        }
        this.items[index] = customer;
    }
}
