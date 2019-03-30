export { CustomerName }

class CustomerName {
    constructor(name) {
        if (name instanceof CustomerName) {
            name = name.value;
        } else {
            if (typeof name !== 'string') {
                throw new TypeError('Customer name: expected string but `' + (typeof name) + '` received');
            }
            name = name.trim();
            if (!name.length) {
                throw new TypeError('Customer: name cannot be empty');
            }
        }
        this.value = name;
    }
    static create(value = null) {
        return new CustomerName(value);
    }
}
