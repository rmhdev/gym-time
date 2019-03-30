import { expect } from 'chai'
import { CustomerRepository } from "@/domain/model/customer/CustomerRepository"
import { Customer } from "@/domain/model/customer/Customer";
import { CustomerDataBuilder } from "./CustomerDataBuilder";

describe('CustomerRepository', () => {
    it('should be empty when created', () => {
        let repository = new CustomerRepository();
        expect(repository.count()).to.equal(0);
        expect(repository.all()).to.be.an('Array').that.is.empty;
    });
    it('adding a customer should be saved', () => {
        let repository = new CustomerRepository();
        let customer = CustomerDataBuilder.aCustomer().withName('Name One').build();
        repository.add(customer);
        expect(repository.count()).to.equal(1);
        expect(repository.all()[0]).to.be.an.instanceof(Customer);
    });
    it('throws an exception when adding an element different to Customer', () => {
        let repository = new CustomerRepository();

        expect(function () { repository.add() }, 'Adding nothing').to.throw(TypeError);
        expect(function () { repository.add(new Date()) }, 'Adding an object Date ').to.throw(TypeError);
        expect(function () { repository.add('Customer') }, 'Adding a string').to.throw(TypeError);
        expect(function () { repository.add(null) }, 'Adding a null').to.throw(TypeError);
    });
});
