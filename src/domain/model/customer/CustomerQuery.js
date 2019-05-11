export { CustomerQuery }

class CustomerQuery {
    constructor(value = {}, sortBy = {}) {
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
    getSortBy(name) {
        if (undefined === this.sortBy[name]) {
            return null;
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
    static fromJSON(queryJSON) {
        if (undefined === queryJSON) {
            return new CustomerQuery();
        }

        return new CustomerQuery(queryJSON.value, queryJSON.sortBy);
    }
}
