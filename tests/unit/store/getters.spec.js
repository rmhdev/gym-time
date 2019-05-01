import { expect } from 'chai'
import getters from '@/store/getters'

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
});
