import { expect } from 'chai'
import mutations from '@/store/mutations'
import { CustomerRepository } from "@/domain/model/customer/CustomerRepository";
import { CustomerDataBuilder } from "../domain/model/customer/CustomerDataBuilder";

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
        expect(state.checkoutCustomers.length, 'Checkout single customer').eq(1);
        expect(state.checkoutCustomers[0], 'Checkout info from single user').to.eql(payload);
    });
});
