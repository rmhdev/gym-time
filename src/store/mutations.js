import { CustomerId } from "@/domain/model/customer/CustomerId";
import {CustomerQuery} from "@/domain/model/customer/CustomerQuery";

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
    },
    updateCustomerQueryValue(state, payload) {
        let updatedValue = state.customerQuery.value;
        updatedValue[payload.name] = payload.value;
        state.customerQuery = { ...state.customerQuery, value: updatedValue };
    },
    updateCustomerQuerySort(state, payload) {
        let updatedSortBy = {};
        updatedSortBy[payload.name] = payload.value;
        state.customerQuery = { ...state.customerQuery, sortBy: updatedSortBy };
    },
    restartCustomerQuery(state) {
        state.customerQuery = CustomerQuery.default().toJSON();
    }
}
