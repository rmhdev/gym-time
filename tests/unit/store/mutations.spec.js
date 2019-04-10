import { expect } from 'chai'
import mutations from '@/store/mutations'
import { Customer } from "@/domain/model/customer/Customer";
import { CustomerRepository } from "@/domain/model/customer/CustomerRepository";
import { CustomerDataBuilder } from "../domain/model/customer/CustomerDataBuilder";

describe('mutations.js', () => {
    it('should accept adding a customer', () => {
        const state = {
            customerRepository: new CustomerRepository()
        };
        const customer = CustomerDataBuilder.aCustomer().build();
        mutations.addCustomer(state, customer);
        expect(state.customerRepository.count()).eq(1);
        expect(state.customerRepository.findById(customer.id)).to.be.an.instanceof(Customer);
    });
});
