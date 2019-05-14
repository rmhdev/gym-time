import { expect } from 'chai'
import actions from '@/store/actions'
import { CustomerRepository } from "@/domain/model/customer/CustomerRepository";

describe('store actions', () => {

    // Taken from https://github.com/vuejs/vuex/blob/dev/docs/guide/testing.md
    //
    // helper for testing action with expected mutations
    const testAction = (action, payload, state, expectedMutations, done) => {
        let count = 0;

        // mock commit
        const commit = (type) => {
            const mutation = expectedMutations[count];
            try {
                expect(type).to.equal(mutation.type);
            } catch (error) {
                done(error);
                throw error;
            }
            count++;
            if (count >= expectedMutations.length) {
                done()
            }
        };

        // call the action with mocked store and arguments
        action({ commit, state }, payload);

        // check if no mutations should have been dispatched
        if (expectedMutations.length === 0) {
            expect(count).to.equal(0);
            done();
        }
    };

    it('should create and add a new customer to the repository', done => {
        testAction(
            actions.createAndAddNewCustomer,
            { name: 'Ms Action', category: 'lorem' },
            {
                customerRepository: new CustomerRepository(),
                checkoutCustomers: []
            },
            [
                { type: 'addCustomer' }
            ],
            done
        )
    });
    it('should add a new customer to the checkout list', done => {
        testAction(
            actions.toggleCheckoutCustomer,
            { 'id': '123abc' },
            {
                customerRepository: new CustomerRepository(),
                checkoutCustomers: []
            },
            [
                { type: 'toggleCheckoutCustomer' }
            ],
            done
        )
    });
    it('should persist checkout customers', done => {
        testAction(
            actions.persistCheckoutCustomers,
            {},
            {
                customerRepository: new CustomerRepository(),
                checkoutCustomers: []
            },
            [
                { type: 'persistCheckoutCustomers' }
            ],
            done
        )
    });
    it('should empty the list of checkout customers', done => {
        testAction(
            actions.initialiseCheckoutCustomers,
            {},
            {
                customerRepository: new CustomerRepository(),
                checkoutCustomers: []
            },
            [
                { type: 'initialiseCheckoutCustomers' }
            ],
            done
        )
    });
    it('should update a search query value', done => {
        testAction(
            actions.updateCustomerQueryValue,
            {},
            {
                customerRepository: new CustomerRepository(),
                checkoutCustomers: [],
                customerQuery: {}
            },
            [
                { type: 'updateCustomerQueryValue' }
            ],
            done
        )
    });
});
