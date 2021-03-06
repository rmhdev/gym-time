import { expect } from 'chai'
import mutations from '@/store/mutations'
import { CustomerRepository } from "@/domain/model/customer/CustomerRepository";
import { CustomerDataBuilder } from "../domain/model/customer/CustomerDataBuilder";
import { CustomerStatus } from "@/domain/model/customer/CustomerStatus";
import { CustomerQuery } from "@/domain/model/customer/CustomerQuery";

describe('store mutations', () => {
    it('should add a new customer in the repository', () => {
        const state = {
            customerRepository: new CustomerRepository()
        };
        mutations.addCustomer(state, CustomerDataBuilder.aCustomer().withName('Mr Mutation').build());
        expect(state.customerRepository.count()).eq(1);

        const customer = state.customerRepository.all()[0];
        expect(customer.name.value).equal("Mr Mutation");
    });
    it('should mark a customer to be ready to checkout', () => {
        let repository = new CustomerRepository();
        const customer = CustomerDataBuilder.aCustomer().withId('checkout123').build();
        repository.add(customer);
        const state = {
            customerRepository: repository,
            checkoutCustomers: []
        };
        const payload = { id: customer.id.value };
        mutations.toggleCheckoutCustomer(state, payload);
        expect(state.checkoutCustomers, 'Checkout single customer').to.eql([{id: 'checkout123'}]);
    });
    it('should remove a customer from the checkout list', () => {
        let repository = new CustomerRepository();
        const customer = CustomerDataBuilder.aCustomer().withId('checkout123').build();
        repository.add(customer);
        const state = {
            customerRepository: repository,
            checkoutCustomers: []
        };
        const payload = { id: customer.id.value };
        mutations.toggleCheckoutCustomer(state, payload);
        mutations.toggleCheckoutCustomer(state, payload);
        expect(state.checkoutCustomers, 'Customer should not be in Checkout list').to.eql([]);
    });
    it('persists customers in the repository, marked as checkout', () => {
        let repository = new CustomerRepository();
        let customer = CustomerDataBuilder.aCustomer().withId('checkout123').build();
        repository.add(customer);
        let state = {
            customerRepository: repository,
            checkoutCustomers: [{ id: customer.id.value }]
        };
        mutations.persistCheckoutCustomers(state);

        expect(
            state.customerRepository.findById('checkout123').status(),
            'After persisting, the customer in the repository should be updated'
        ).to.eql(CustomerStatus.createOut());
        expect(
            state.checkoutCustomers,
            'After persisting, list of customers to checkout should be empty'
        ).to.eql([]);
    });
    it('should ignore customers to checkout if they do not exist in the repository', () => {
        let repository = new CustomerRepository();
        const customer = CustomerDataBuilder.aCustomer().withId('qwerty123').build();
        repository.add(customer);
        let state = {
            customerRepository: repository,
            checkoutCustomers: []
        };
        mutations.toggleCheckoutCustomer(state, { id: 'fake000' });
        expect(
            state.checkoutCustomers,
            'Add info of a customer that does not exist in the repository'
        ).to.eql([{ id: 'fake000' }]);

        mutations.persistCheckoutCustomers(state);
        expect(
            state.checkoutCustomers.length,
            'Customer is not in the repository should be removed from the list'
        ).eq(0);
    });

    it('allows cancelling the list of customers ready to checkout', () => {
        let repository = new CustomerRepository();
        const customer = CustomerDataBuilder.aCustomer().withId('qwerty123').build();
        repository.add(customer);
        let state = {
            customerRepository: repository,
            checkoutCustomers: []
        };
        mutations.toggleCheckoutCustomer(state, { id: 'qwerty123' });
        mutations.toggleCheckoutCustomer(state, { id: 'fake000' });
        mutations.initialiseCheckoutCustomers(state);

        expect(
            state.checkoutCustomers,
            'The list of checkout customers should be empty'
        ).to.eql([]);
    });

    it('allows updating a customer query value', () => {
        let state = {
            customerQuery: { value: { status: 'active' }, sortBy: { checkIn: 'desc' } },
        };

        mutations.updateCustomerQueryValue(state, { name: 'status', value: '' });
        expect(
            state.customerQuery,
            'The status should be empty'
        ).to.eql({ value: { status: '' }, sortBy: { checkIn: 'desc' } });

        mutations.updateCustomerQueryValue(state, { name: 'status', value: 'out' });
        expect(
            state.customerQuery,
            'The status should have changed'
        ).to.eql({ value: { status: 'out' }, sortBy: { checkIn: 'desc' } });

        mutations.updateCustomerQueryValue(state, { name: 'category', value: 'public' });
        expect(
            state.customerQuery,
            'The status should have a new value "category"'
        ).to.eql({ value: { status: 'out', category: 'public' }, sortBy: { checkIn: 'desc' } });
    });

    it('allows updating a customer query sort', () => {
        let state = {
            customerQuery: { value: {}, sortBy: { checkIn: 'desc' } },
        };

        mutations.updateCustomerQuerySort(state, { name: 'checkIn', value: 'asc' });
        expect(
            state.customerQuery,
            'The sort value should be empty'
        ).to.eql({ value: {}, sortBy: { checkIn: 'asc' } });

        mutations.updateCustomerQuerySort(state, { name: 'name', value: 'asc' });
        expect(
            state.customerQuery,
            'The sort field should have changed'
        ).to.eql({ value: {}, sortBy: { name: 'asc' } });
    });

    it('allows restarting the customer query', () => {
        let state = {
            customerQuery: { value: { one: '1' }, sortBy: { two: '2' }},
        };

        mutations.restartCustomerQuery(state);
        expect(
            state.customerQuery,
            'The status should have default values'
        ).to.eql(CustomerQuery.default().toJSON());
    });

    it('allows updating the datetime', () => {
        let state = {
            datetime: null
        };
        mutations.updateDatetime(state, '2019-03-19T19:34:56.000Z');
        expect(
            state.datetime,
            'The datetime should be updated'
        ).to.eq('2019-03-19T19:34:56.000Z');

        state = {
            datetime: null
        };
        mutations.updateDatetime(state);
        expect(
            state.datetime,
            'The datetime should be the actual one if not defined'
        ).to.be.a('string');
    });

    it('allows updating a customer', () => {
        const customer = CustomerDataBuilder.aCustomer()
            .withId('qwerty123')
            .withName('Old Name')
            .withCheckIn('2019-03-19T19:34:56.000Z')
            .withCategory('one')
            .build();
        let repository = new CustomerRepository();
        repository.add(customer);
        let state = {
            customerRepository: repository
        };
        mutations.updateCustomer(state, { id: 'qwerty123', name: 'New Name', category: 'two' });
        let updatedCustomer = state.customerRepository.findById('qwerty123');

        expect(updatedCustomer.name.value, 'Updated customer name').to.eq('New Name');
        expect(updatedCustomer.category, 'Updated customer category').to.eq('two');
    });
});
