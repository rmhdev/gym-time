import { expect } from 'chai'
import { Customer } from '@/domain/model/customer/Customer'

describe('Customer', () => {
    it('throws exception if no name is defined', () => {
        let newCustomerWithNoName = function () { new Customer('') };
        expect(newCustomerWithNoName).to.throw(TypeError);
    });
    it('defines a checkin date if left empty', () => {
        let customer = new Customer('FakeName');
        expect(customer.checkIn()).to.be.a('Date');
    });
    it('returns the date defined as a new date', () => {
        let checkIn = new Date('2019-03-19T12:00:00+0000');
        let customer = new Customer('FakeName', checkIn);
        expect(customer.checkIn()).to.be.a('Date');
        expect(customer.checkIn().toISOString()).eq('2019-03-19T12:00:00.000Z');
    });
});
