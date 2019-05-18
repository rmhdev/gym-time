import {CustomerId} from "@/domain/model/customer/CustomerId";
import {CustomerCategory} from "@/domain/model/customer/CustomerCategory";
import {CustomerQuery} from "@/domain/model/customer/CustomerQuery";

export default {
    getRepository: (state) => {
        return state.customerRepository;
    },
    getCheckoutCustomers: (state) => {
        return state.customerRepository.findById(
            state.checkoutCustomers.map((payload) => { return payload.id })
        );
    },
    isCheckoutCustomer: (state) => (customer) => {
        const id = CustomerId.create(customer.id);

        return state.checkoutCustomers.find(function (item) {
            return id.equals(item.id);
        }) !== undefined;
    },
    getCategories: (state) => {
        return state.categories.map(category => new CustomerCategory(category));
    },
    getCustomerQuery: (state) => {
        return CustomerQuery.fromJSON(state.customerQuery);
    },
    getFilteredCustomers: (state) => {
        if (state.customerRepository.version || state.customerQuery) {
            // hack to make vue detect a change in the repository
        }

        return state.customerRepository.find(
            CustomerQuery.fromJSON(state.customerQuery)
        );
    },
}
