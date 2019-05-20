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
    equals(id) {
        try {
            return CustomerId.create(id).value === this.value;
        } catch (e) {
            return false;
        }
    }
    compareWith(id) {
        return this.value.toString().localeCompare(
            CustomerId.create(id).value.toString()
        );
    }
    inArray(ids) {
        const searchIds = Array.isArray(ids) ? ids : [ids];
        let isInArray = false;
        searchIds.forEach((searchId) => {
            let isFound = false;
            try {
                isFound = this.equals(searchId);
            } catch (e) {
                isFound = false;
            }
            isInArray = isInArray || isFound;
        });

        return isInArray;
    }
    static create(value = null) {
        return new CustomerId((null === value)
            ? 'customer_id_' + Math.random().toString(16).substr(2)
            : value
        );
    }
}
