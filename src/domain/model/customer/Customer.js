export { Customer }

class Customer {
    constructor(id, name = '', checkIn = null) {
        if (typeof id !== 'string') {
            throw new TypeError('Customer: id must be string, `' + (typeof id) + '` received');
        }
        id = id.trim();
        if ('' === id) {
            throw new TypeError('Customer: empty id');
        }
        if (typeof name !== 'string') {
            throw new TypeError('Customer: name cannot be empty');
        }
        if (!name.length) {
            throw new TypeError('Customer: name cannot be empty');
        }
        this.name = name;
        this.checkInTimestamp = (checkIn instanceof Date) ? checkIn.getTime() : Date.now();
    }
    checkIn() {
        return new Date(this.checkInTimestamp);
    }
}
