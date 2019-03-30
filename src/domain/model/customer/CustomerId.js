export { CustomerId }

class CustomerId {
    constructor(id) {
        if (id instanceof CustomerId) {
            id = id.value;
        } else {
            if (typeof id !== 'string') {
                throw new TypeError('Customer: id must be string, `' + (typeof id) + '` received');
            }
            id = id.trim();
            if ('' === id) {
                throw new TypeError('Customer: empty id');
            }
        }
        this.value = id;
    }
    static create(value = null) {
        return new CustomerId((null === value)
            ? 'customer_id_' + Math.random().toString(16).substr(2)
            : value
        );
    }
}
