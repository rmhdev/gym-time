export default {
    getRepository(state) {
        return state.customerRepository;
    },
    getCheckoutCustomers(state) {
        return state.checkoutCustomers;
    }
}
