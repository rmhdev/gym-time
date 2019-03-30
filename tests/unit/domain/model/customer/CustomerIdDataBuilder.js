import { CustomerId } from "@/domain/model/customer/CustomerId";

export { CustomerIdDataBuilder }

class CustomerIdDataBuilder {
    constructor() {
        this.id = '123456qwerty';
    }
    withId(id) {
        this.id = id;

        return this;
    }
    build() {
        return new CustomerId(this.id);
    }
    static aCustomerId() {
        return new CustomerIdDataBuilder();
    }
}
