import { expect } from 'chai'
import { CustomerRepository } from "@/domain/model/customer/CustomerRepository"
import { Customer } from "@/domain/model/customer/Customer";
import { CustomerDataBuilder } from "./CustomerDataBuilder";
import { CustomerNoFoundException } from "@/domain/model/customer/CustomerNotFoundException";

describe('CustomerRepository', () => {
    it('should be empty when created', () => {
        let repository = new CustomerRepository();
        expect(repository.count()).to.equal(0);
        expect(repository.all()).to.be.an('Array').that.is.empty;
    });
    it('should saved a customer when added', () => {
        let repository = new CustomerRepository();
        let customer = CustomerDataBuilder.aCustomer().withName('Name One').build();
        repository.add(customer);
        expect(repository.count()).to.equal(1);
        expect(repository.all()[0]).to.be.an.instanceof(Customer);
    });
    it('throws an exception when adding an element different to Customer', () => {
        let repository = new CustomerRepository();

        expect(() => { repository.add() }, 'Adding nothing').to.throw(TypeError);
        expect(() => { repository.add(new Date()) }, 'Adding an object Date ').to.throw(TypeError);
        expect(() => { repository.add('Customer') }, 'Adding a string').to.throw(TypeError);
        expect(() => { repository.add(null) }, 'Adding a null').to.throw(TypeError);
    });
    it('returns a customer looking by id', () => {
        let repository = new CustomerRepository();
        const customer = CustomerDataBuilder.aCustomer().withId('111').withName('Lorem Ipsum').build();
        repository.add(customer);

        const result = repository.findById('111');
        expect(result).to.be.an.instanceof(Customer);
        expect(result.name.value).to.equal('Lorem Ipsum');
    });
    it('throws error when no customer is found by id', () => {
        let repository = new CustomerRepository();
        const customer = CustomerDataBuilder.aCustomer().withId('111').withName('Lorem Ipsum').build();
        repository.add(customer);

        expect(() => { repository.findById('aaa') }).to.throw(CustomerNoFoundException);
    });
    it('removes a customer by id', () => {
        let repository = new CustomerRepository();
        const customer = CustomerDataBuilder.aCustomer().withId('111').build();

        repository.add(customer);
        expect(repository.count(), 'The customer is added correctly').to.equal(1);

        repository.remove('111');
        expect(repository.count(), 'The customer is removed correctly').to.equal(0);
    });
    it('throws error when trying to remove a non existing customer', () => {
        let repository = new CustomerRepository();
        const customer = CustomerDataBuilder.aCustomer().withId('111').build();

        repository.add(customer);
        expect(repository.count(), 'The customer is added correctly').to.equal(1);

        expect(() => { repository.remove('222') }).to.throw(CustomerNoFoundException);
    });
});
