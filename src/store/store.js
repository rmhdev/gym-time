import mutations from './mutations'
import getters from './getters'
import { CustomerRepository } from "@/domain/model/customer/CustomerRepository";

export default {
    state: {
        customerRepository: new CustomerRepository()
    },
    mutations,
    getters
}
