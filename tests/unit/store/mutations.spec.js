import { expect } from 'chai'
import mutations from '@/store/mutations'
import { CustomerRepository } from "@/domain/model/customer/CustomerRepository";
import { CustomerDataBuilder } from "../domain/model/customer/CustomerDataBuilder";
import { CustomerStatus } from "@/domain/model/customer/CustomerStatus";

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
});
