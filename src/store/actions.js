import { Customer } from "@/domain/model/customer/Customer";

export default {
    createAndAddNewCustomer({ commit }, payload) {
        commit('addCustomer', Customer.create(payload.name));
    },
    toggleCheckoutCustomer({ commit }, payload) {
        console.log('toggleCheckoutCustomer');
        console.log(payload);
        commit('toggleCheckoutCustomer', payload);
    },
    persistCheckoutCustomers({ commit }, payload) {
        commit('persistCheckoutCustomers', payload);
    }
}
