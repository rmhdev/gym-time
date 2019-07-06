import { expect } from 'chai'
import getters from '@/store/getters'
import {CustomerCategory} from "@/domain/model/customer/CustomerCategory";
import {TimeFormatter} from "@/domain/model/TimeFormatter";

describe('store getters', () => {
    it('should return if a customer is in the checkout list', () => {
        const checkoutCustomers = [
            { id: "lorem" }
        ];
        const state = {
            checkoutCustomers: checkoutCustomers
        };
        expect(
            getters.isCheckoutCustomer(state)({ id: "lorem" }),
            'Customer is in the list'
        ).eq(true);
        expect(
            getters.isCheckoutCustomer(state)({ id: "qwerty" }),
            'Customer is NOT in the list'
        ).eq(false);
    });
    it('should return a list of categories', () => {
        const expected = [
            new CustomerCategory('one'),
            new CustomerCategory('two'),
            new CustomerCategory('three'),
        ];
        const state = { categories: ['one', 'two', 'three'] };

        expect(getters.getCategories(state), 'List of custom categories').to.eql(expected);
    });
    it('should return a category', () => {
        const state = { categories: ['one', 'two', 'three'] };

        expect(
            getters.getCategory(state)('one'),
            'Returns a defined category'
        ).to.eql(new CustomerCategory('one'));
    });
    it('should return null when retrieving a non existing category', () => {
        const state = { categories: ['one', 'two', 'three'] };

        expect(getters.getCategory(state)('four'), 'Category does not exist').to.eql(null);
    });

    it('returns the defined date', () => {
        const datetime = '2019-03-19T12:34:56+0000';
        const state = { datetime: datetime };

        expect(getters.getDate(state), 'Date object').to.eql(new Date(datetime));
    });

    it('returns the time format', () => {
        expect(getters.isHour12({}), 'Boolean result').to.eql(false);
        expect(getters.isHour12({ hour12: true }), 'Boolean result').to.eql(true);
        expect(getters.isHour12({ hour12: null }), 'Boolean result').to.eql(false);
    });

    it('returns the default time formatter', () => {
        expect(getters.getTimeFormatter({}), 'No hour12 info').to.eql(new TimeFormatter(false));
        expect(getters.getTimeFormatter({ hour12: true }), 'Boolean result').to.eql(new TimeFormatter(true));
        expect(getters.getTimeFormatter({ hour12: null }), 'Boolean result').to.eql(new TimeFormatter(false));
    });

    it('returns the query with the current date', () => {
        const datetime = '2019-03-19T12:34:56+0000';
        const state = { customerQuery: {}, datetime: datetime };

        expect(getters.getCustomerQuery(state).get('date'), 'Current date').equals('2019-03-19');
    });
});
