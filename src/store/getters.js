import {CustomerId} from "@/domain/model/customer/CustomerId";
import {CustomerCategory} from "@/domain/model/customer/CustomerCategory";
import {CustomerQuery} from "@/domain/model/customer/CustomerQuery";
import {TimeFormatter} from "../domain/model/TimeFormatter";
import {DateFormatter} from "../domain/model/DateFormatter";

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
    getCategory: (state) => (slug) => {
        if (state.categories.includes(slug)) {
            return new CustomerCategory(slug);
        }
        return null;
    },
    getCustomerQuery: (state) => {
        let query = CustomerQuery.fromJSON(state.customerQuery);

        return query.add('date', state.datetime ? state.datetime.substring(0, 10) : null);
    },
    getFilteredCustomers: (state) => {
        if (state.customerRepository.version || state.customerQuery) {
            // hack to make vue detect a change in the repository
        }

        return state.customerRepository.find(
            CustomerQuery.fromJSON(state.customerQuery)
        );
    },
    getDate: (state) => {
        return (state.datetime === null) ? new Date() : new Date(state.datetime);
    },
    isHour12: (state) => {
        if (undefined === state.hour12) {
            return false;
        }

        return Boolean(state.hour12).valueOf();
    },
    getTimeFormatter: (state) => {
        let hour12 = false;
        if (undefined !== state.hour12) {
            hour12 = Boolean(state.hour12).valueOf();
        }

        return new TimeFormatter(hour12);
    },
    getDateFormatter: () => {
        return new DateFormatter();
    }
}
