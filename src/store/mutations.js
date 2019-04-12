import { Customer } from "@/domain/model/customer/Customer";

export default {
    addCustomer(state, payload) {
        state.customerRepository.add(Customer.create(payload.name));
    }
}
