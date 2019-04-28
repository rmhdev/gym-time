import { Customer } from "@/domain/model/customer/Customer";

export default {
    createAndAddNewCustomer({ commit }, payload) {
        commit('addCustomer', Customer.create(payload.name));
    },
    addCheckoutCustomer({ commit }, payload) {
        commit('addCheckoutCustomer', payload);
    },
    persistCheckoutCustomers({ commit }, payload) {
        commit('persistCheckoutCustomers', payload);
    }
}
