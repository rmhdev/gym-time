import { Customer } from "@/domain/model/customer/Customer";

export default {
    createAndAddNewCustomer({ commit }, payload) {
        commit('addCustomer', Customer.create(payload.name));
    }
}
