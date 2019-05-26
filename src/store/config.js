import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import { CustomerRepository } from "@/domain/model/customer/CustomerRepository";
import { CustomerQuery } from "@/domain/model/customer/CustomerQuery";

export default {
    state: {
        customerRepository: new CustomerRepository(),
        customerQuery: CustomerQuery.default().toJSON(),
        checkoutCustomers: [],
        categories: ['public'],
        datetime: null,
    },
    mutations,
    actions,
    getters
};
