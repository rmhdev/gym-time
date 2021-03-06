import { Customer } from "@/domain/model/customer/Customer";

export default {
    createAndAddNewCustomer({ commit }, payload) {
        commit('addCustomer', Customer.create(payload.name, payload.category));
    },
    updateCustomer({ commit }, payload) {
        commit('updateCustomer', payload);
    },
    toggleCheckoutCustomer({ commit }, payload) {
        commit('toggleCheckoutCustomer', payload);
    },
    persistCheckoutCustomers({ commit }, payload) {
        commit('persistCheckoutCustomers', payload);
    },
    initialiseCheckoutCustomers({ commit }) {
        commit('initialiseCheckoutCustomers');
    },
    updateCustomerQueryValue({ commit }, payload) {
        commit('updateCustomerQueryValue', payload);
    },
    updateCustomerQuerySort({ commit }, payload) {
        commit('updateCustomerQuerySort', payload);
    },
    restartCustomerQuery({ commit }) {
        commit('restartCustomerQuery');
    },
    updateDatetime({ commit }, datetime) {
        commit('updateDatetime', datetime);
    },
}
