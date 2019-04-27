import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import { CustomerRepository } from "@/domain/model/customer/CustomerRepository";

export default {
    state: {
        customerRepository: new CustomerRepository(),
        checkoutCustomers: []
    },
    mutations,
    actions,
    getters
};
