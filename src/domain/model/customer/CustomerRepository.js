import { Customer } from '@/domain/model/customer/Customer'
import { CustomerNoFoundException } from "@/domain/model/customer/CustomerNotFoundException";
import { CustomerIdNotUniqueException } from "@/domain/model/customer/CustomerIdNotUniqueException";
import { CustomerTypeException } from "@/domain/model/customer/CustomerTypeException";
import { CustomerQuery } from "@/domain/model/customer/CustomerQuery";

export { CustomerRepository }

class CustomerRepository {
    constructor() {
        this.items = [];
        this.version = 0;
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
            this.version += 1;
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
        this.version += 1;
    }
    findById(id) {
        if (Array.isArray(id)) {
            return this.items.filter((customer) => {
                return customer.id.inArray(id);
            });
        }
        const result = this.items.find((customer) => {
            return customer.id.equals(id);
        });
        if (result) {
            return result;
        }
        throw new CustomerNoFoundException('CustomerRepository: item with id `' + id.toString() + '` not found');
    }
    find(customerQuery) {
        if (customerQuery instanceof CustomerQuery) {
            return this.items
                .filter((customer) => customerQuery.isAccepted(customer))
                .sort((a, b) => customerQuery.compare(a, b))
            ;
        }
        throw new TypeError('Find by query: expected CustomerType but `' + (typeof customerQuery) + '` received');
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
        this.version += 1;
    }
}
