export { Customer }

class Customer {
    constructor(name = '', checkIn = null) {
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
