import {CustomerId} from "@/domain/model/customer/CustomerId";
import {CustomerCategory} from "@/domain/model/customer/CustomerCategory";

export default {
    getRepository: (state) => {
        return state.customerRepository;
    },
    getCheckoutCustomers: (state) => {
        return state.checkoutCustomers;
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
}
