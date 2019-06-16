import { Customer } from "./Customer";

export { CustomerQuery }

class CustomerQuery {
    constructor(value = {}, sortBy = {}) {
        //this.value.constructor === Object
        this.value = value;
        this.sortBy = sortBy;
    }
    toJSON() {
        return {
            value: Object.assign({}, this.value),
            sortBy: Object.assign({}, this.sortBy)
        };
    }
    get(name, defaultValue = null) {
        if (!this.has(name)) {
            return defaultValue;
        }

        return this.value[name];
    }
    has(name) {
        return (undefined !== this.value[name]);
    }
    add(name, value) {
        let json = this.toJSON();
        json.value[name] = value;

        return CustomerQuery.fromJSON(json);
    }
    remove(name) {
        let json = this.toJSON();
        if (this.has(name)) {
            delete json.value[name];
        }

        return CustomerQuery.fromJSON(json);
    }
    getSortBy(name, defaultValue = null) {
        if (undefined === this.sortBy[name]) {
            return defaultValue;
        }

        return this.sortBy[name];
    }
    isSortedBy(name) {
        return (undefined !== this.sortBy[name]);
    }
    addSortBy(name, order) {
        let json = this.toJSON();
        json.sortBy[name] = order;

        return CustomerQuery.fromJSON(json);
    }
    removeSortBy(name) {
        let json = this.toJSON();
        if (this.isSortedBy(name)) {
            delete json.sortBy[name];
        }

        return CustomerQuery.fromJSON(json);
    }
    isAccepted(customer) {
        if (customer instanceof Customer) {
            if (Object.entries(this.value).length === 0) {
                return true;
            }
            let result = true;
            let checks = 0;
            if (this.has('id')) {
                checks += 1;
                result = result && customer.id.equals(this.get('id'));
            }
            if (this.has('status')) {
                checks += 1;
                result = result && (
                    this.get('status') === ''
                    || customer.status().equals(this.get('status'))
                );
            }
            if (this.has('name')) {
                checks += 1;
                result = result && customer.name.isSimilar(this.get('name'));
            }
            if (this.has('category')) {
                checks += 1;
                result = result && (
                    this.get('category') === ''
                    || customer.category.equals(this.get('category'))
                );
            }
            if (this.has('date')) {
                checks += 1;
                result = result && (
                    customer.checkIn().toISOString().substring(0, 10) === this.get('date')
                    || (
                        customer.checkOut()
                        &&
                        customer.checkOut().toISOString().substring(0, 10) === this.get('date')
                    )
                );
            }
            if (0 === checks) {
                return false;
            }

            return result;
        }
    }
    compare(customerA, customerB) {
        if (!(customerA instanceof Customer)) {
            throw new TypeError('Compare: expected first parameter to be Customer')
        }
        if (!(customerB instanceof Customer)) {
            throw new TypeError('Compare: expected second parameter to be Customer')
        }
        const orders = ['asc', 'desc'];

        if ((this.sortBy['name'] !== undefined) && orders.includes(this.sortBy['name'])) {
            return customerA.name.compareWith(customerB.name) * (this.sortBy['name'] === 'desc' ? -1 : 1);
        }
        if ((this.sortBy['checkIn'] !== undefined) && orders.includes(this.sortBy['checkIn'])) {
            return customerA.checkIn().toISOString().localeCompare(
                customerB.checkIn().toISOString()
            ) * (this.sortBy['checkIn'] === 'desc' ? -1 : 1);
        }
        let order = 'asc';
        if ((this.sortBy['id'] !== undefined) && orders.includes(this.sortBy['id'])) {
            order = this.sortBy['id'];
        }

        return customerA.id.compareWith(customerB.id) * (order === 'desc' ? -1 : 1);
    }
    static default() {
        return CustomerQuery.fromJSON({ value: { status: 'active' }, sortBy: { checkIn: 'desc' } });
    }
    static fromJSON(queryJSON) {
        if (undefined === queryJSON) {
            return new CustomerQuery();
        }

        return new CustomerQuery(queryJSON.value, queryJSON.sortBy);
    }
}
