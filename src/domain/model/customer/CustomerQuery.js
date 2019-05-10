export { CustomerQuery }

class CustomerQuery {
    constructor(value = {}) {
        this.value = value;
    }
    toJSON() {
        return Object.assign({}, this.value);
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
        json[name] = value;

        return new CustomerQuery(json);
    }
    remove(name) {
        let json = this.toJSON();
        if (this.has(name)) {
            delete json[name];
        }

        return new CustomerQuery(json);
    }
}
