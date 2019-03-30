import { expect } from 'chai'
import { CustomerName } from "@/domain/model/customer/CustomerName";

describe('CustomerName', () => {
    it('throws exception if no name is defined', () => {
        expect(function () {
            return CustomerName.create('');
        }).to.throw(TypeError);
    });
    it('throws exception if name has empty spaces', () => {
        expect(function () {
            return CustomerName.create('  ');
        }).to.throw(TypeError);
    });
    it('throws exception if name is not a string', () => {
        expect(function () {
            return CustomerName.create(new Date());
        }).to.throw(TypeError);
    });
    it('returns the defined name, trimmed', () => {
        expect(CustomerName.create(' Name Surname  ').value).to.equal('Name Surname');
    });
});
