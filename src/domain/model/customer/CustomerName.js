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
            if (CustomerName.maxLength() <= name.length) {
                throw new TypeError('Customer: name is too long. `'
                    + name.substr(0, 10)
                    + '...` is '
                    + name.length
                    + ' but max length is '
                    + CustomerName.maxLength()
                );
            }
        }
        this.value = name;
    }
    static create(value = null) {
        return new CustomerName(value);
    }
    static maxLength() {
        return 255;
    }
}
