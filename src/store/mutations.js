export default {
    addCustomer(state, customer) {
        state.customerRepository.add(customer);
    }
}
