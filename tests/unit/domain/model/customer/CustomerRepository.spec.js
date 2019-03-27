import { expect } from 'chai'
import { CustomerRepository } from "@/domain/model/customer/CustomerRepository"
import { Customer } from "@/domain/model/customer/Customer";

describe('CustomerRepository', () => {
    it('should be empty when created', () => {
        let repository = new CustomerRepository();
        expect(repository.count()).to.equal(0);
        expect(repository.all()).to.be.an('Array').that.is.empty;
    });
    it('adding a customer should be saved', () => {
        let repository = new CustomerRepository();
        let customer = new Customer('Name One');
        repository.add(customer);
        expect(repository.count()).to.equal(1);
        expect(repository.all()[0]).to.be.an.instanceof(Customer);
    });
    it('throws an exception when adding nothing', () => {
        let repository = new CustomerRepository();
        let repositoryAddEmpty= function () { repository.add() };
        expect(repositoryAddEmpty).to.throw(TypeError);
    });
    it('throws an exception when adding a null value', () => {
        let repository = new CustomerRepository();
        let repositoryAddNull = function () { repository.add(null) };
        expect(repositoryAddNull).to.throw(TypeError);
    });
    it('throws an exception when adding a non object', () => {
        let repository = new CustomerRepository();
        let repositoryAddString = function () { repository.add('Customer') };
        expect(repositoryAddString).to.throw(TypeError);
    });
    it('throws an exception when adding an element different to Customer', () => {
        let repository = new CustomerRepository();
        let repositoryAddDate = function () { repository.add(new Date()) };
        expect(repositoryAddDate).to.throw(TypeError);
    });
});
