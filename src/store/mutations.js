import { CustomerId } from "@/domain/model/customer/CustomerId";

export default {
    addCustomer(state, customer) {
        state.customerRepository.add(customer);
    },
    toggleCheckoutCustomer(state, customer) {
        const id = CustomerId.create(customer.id);
        const position = state.checkoutCustomers.findIndex(function (item) {
            return id.equals(item.id);
        });
        if (position === -1) {
            state.checkoutCustomers.push(customer);
            return;
        }
        state.checkoutCustomers.splice(position, 1);
    },
    persistCheckoutCustomers(state) {
        for (let i = 0; i < state.checkoutCustomers.length; i++) {
            const element = state.checkoutCustomers[i];
            let customer = null;
            try {
                customer = state.customerRepository.findById(element.id);
                state.customerRepository.update(
                    customer.updateCheckOut(new Date())
                );
            } catch (e) {
                //return;
            }
        }
        state.checkoutCustomers = [];
    },
    initialiseCheckoutCustomers(state) {
        state.checkoutCustomers = [];
    }
}
