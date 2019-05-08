import { Customer } from "@/domain/model/customer/Customer";
import { CustomerCategory } from "@/domain/model/customer/CustomerCategory";

export default {
    createAndAddNewCustomer({ commit }, payload) {
        commit('addCustomer', Customer.create(payload.name, new CustomerCategory(payload.category)));
    },
    toggleCheckoutCustomer({ commit }, payload) {
        commit('toggleCheckoutCustomer', payload);
    },
    persistCheckoutCustomers({ commit }, payload) {
        commit('persistCheckoutCustomers', payload);
    },
    emptyCheckoutCustomers({ commit }) {
        commit('emptyCheckoutCustomers');
    }
}
