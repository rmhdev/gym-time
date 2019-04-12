import { expect } from 'chai'
import mutations from '@/store/mutations'
import { CustomerRepository } from "@/domain/model/customer/CustomerRepository";

describe('mutations.js', () => {
    it('should add a new customer in the repository', () => {
        const state = {
            customerRepository: new CustomerRepository()
        };
        mutations.addCustomer(state, { name: 'Mr Mutation' });
        expect(state.customerRepository.count()).eq(1);

        const customer = state.customerRepository.all()[0];
        expect(customer.name.value).equal("Mr Mutation");
    });
});
