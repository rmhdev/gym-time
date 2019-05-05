export { CustomerCategory }

class CustomerCategory {
    constructor(value, name = null) {
        if (undefined === value) {
            throw new TypeError('CustomerCategory: value is undefined');
        }
        if (typeof value !== 'string') {
            throw new TypeError('CustomerCategory: value must be string, got `' + (typeof value) + '`');
        }
        if ('' === value) {
            throw new TypeError('CustomerCategory: value is empty');
        }
        if (null === name) {
            name = '';
        }
        if (typeof name !== 'string') {
            throw new TypeError('CustomerCategory: name must be string, got `' + (typeof name) + '`');
        }
        this.value = value;
        this.name = name || value;
    }
    equals(category = null) {
        if (category instanceof CustomerCategory) {
            category = category.value;
        }
        try {
            return (new CustomerCategory(category)).value === this.value;
        } catch (e) {
            return false;
        }
    }
}
