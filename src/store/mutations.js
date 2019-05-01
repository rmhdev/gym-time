export default {
    addCustomer(state, customer) {
        state.customerRepository.add(customer);
    },
    addCheckoutCustomer(state, customer) {
        state.checkoutCustomers.push(customer);
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
        this.emptyCheckoutCustomers(state);
    },
    emptyCheckoutCustomers(state) {
        state.checkoutCustomers = [];
    }
}
