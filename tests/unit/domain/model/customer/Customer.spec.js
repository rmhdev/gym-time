import { expect } from 'chai'
import { CustomerDataBuilder } from './CustomerDataBuilder'

describe('Customer', () => {
    it('throws exception if no name is defined', () => {
       let newCustomerWithNoName = function () {
           return CustomerDataBuilder.aCustomer().withName(null).build();
       };
       expect(newCustomerWithNoName).to.throw(TypeError);
    });
    it('throws exception if name is not a string', () => {
        let newCustomerWithDateAsName = function () {
            return CustomerDataBuilder.aCustomer().withName(new Date()).build();
        };
        expect(newCustomerWithDateAsName).to.throw(TypeError);
    });
    it('defines a checkin date if left empty', () => {
        const customer = CustomerDataBuilder.aCustomer().withCheckIn(new Date()).build();
        expect(customer.checkIn()).to.be.a('Date');
    });
    it('returns the date defined as a new date', () => {
        let checkIn = new Date('2019-03-19T12:00:00+0000');
        const customer = CustomerDataBuilder.aCustomer().withCheckIn(checkIn).build();
        expect(customer.checkIn()).to.be.a('Date');
        expect(customer.checkIn().toISOString()).eq('2019-03-19T12:00:00.000Z');
    });
});
