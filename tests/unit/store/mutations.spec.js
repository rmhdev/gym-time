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
        mutations.addCheckoutCustomer(state, payload);
        expect(state.checkoutCustomers, 'Checkout single customer').to.eql([{id: 'checkout123'}]);
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
        mutations.addCheckoutCustomer(state, { id: 'fake000' });
        expect(state.checkoutCustomers).to.eql([{ id: 'fake000' }]);

        mutations.persistCheckoutCustomers(state);
        expect(
            state.checkoutCustomers.length,
            'Customer is not in the repository should be kept in the list'
        ).eq(1);
    });
});
