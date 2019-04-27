export default {
    addCustomer(state, customer) {
        state.customerRepository.add(customer);
    },
    addCheckoutCustomer(state, customer) {
        state.checkoutCustomers.push(customer);
    }
}
