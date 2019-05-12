import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import { CustomerRepository } from "@/domain/model/customer/CustomerRepository";

export default {
    state: {
        customerRepository: new CustomerRepository(),
        customerQuery: { value: { status: 'active' }, sortBy: { checkIn: 'desc' } },
        checkoutCustomers: [],
        categories: ['public'],
    },
    mutations,
    actions,
    getters
};
