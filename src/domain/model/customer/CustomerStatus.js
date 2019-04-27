export { CustomerStatus }

class CustomerStatus {
    constructor(status) {
        if (status instanceof CustomerStatus) {
            status = status.value;
        }
        if (typeof status === 'undefined' || status === null) {
            status = '';
        }
        if (typeof status !== 'string') {
            throw new TypeError('CustomerStatus: id must be string, `' + (typeof id) + '` received');
        }
        status = status.trim().toLowerCase();
        if ('' === status) {
            status = 'active';
        }
        this.value = status;
    }
    equals(status) {
        try {
            return (new CustomerStatus(status)).value === this.value;
        } catch (e) {
            return false;
        }
    }
    static createActive() {
        return new CustomerStatus('active');
    }
    static createOut() {
        return new CustomerStatus('out');
    }
    static createDeleted() {
        return new CustomerStatus('deleted');
    }
    static all() {
        return [
            CustomerStatus.createActive(),
            CustomerStatus.createOut(),
            CustomerStatus.createDeleted(),
        ];
    }
}
