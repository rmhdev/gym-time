import { expect } from 'chai'
import { CustomerDataBuilder } from './CustomerDataBuilder'
import { Customer } from "@/domain/model/customer/Customer";
import { CustomerStatus } from "@/domain/model/customer/CustomerStatus";
import { CustomerCategory } from "@/domain/model/customer/CustomerCategory";

describe('Customer', () => {
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
    it('creates a new customer info given by the user', () => {
        const customer = Customer.create('Lorem Ipsum', new CustomerCategory('category'));
        expect(customer).to.be.instanceOf(Customer);
        expect(customer.name.value).eq('Lorem Ipsum');
        expect(customer.category.value).eq('category');
    });
    it('defines null as default checkout date', () => {
        const customer = CustomerDataBuilder.aCustomer().withCheckIn(new Date()).build();
        expect(customer.checkOut()).eq(null);
    });
    it('allows defining a checkout date', () => {
        let checkIn = new Date('2019-03-19T12:00:00+0000');
        let checkOut = new Date('2019-03-19T12:45:12+0000');
        const customer = CustomerDataBuilder.aCustomer().withCheckIn(checkIn).withCheckOut(checkOut).build();
        expect(customer.checkOut().toISOString()).eq(checkOut.toISOString());
    });
    it('incorrect types in checkout values defaults to null', () => {
        let checkIn = new Date('2019-03-19T12:00:00+0000');
        const customer = CustomerDataBuilder.aCustomer().withCheckIn(checkIn).withCheckOut({}).build();
        expect(customer.checkOut()).eq(null);
    });
    it('sets category to null when type is incorrect', () => {
        const customer = CustomerDataBuilder.aCustomer().withCategory(new Date()).build();
        expect(customer.category).eq(null);
    });
    it('allows updating the checkout date, maintaining immutability', () => {
        let checkIn = new Date('2019-03-19T12:00:00+0000');
        let checkOut = new Date('2019-03-19T12:45:12+0000');
        const initialCustomer = CustomerDataBuilder.aCustomer()
            .withId('111')
            .withCheckIn(checkIn)
            .withCheckOut(null)
            .build();
        const updatedCustomer = initialCustomer.updateCheckOut(checkOut);
        const expected = CustomerDataBuilder.aCustomer()
            .withId('111')
            .withCheckIn(checkIn)
            .withCheckOut(checkOut)
            .build();

        expect(initialCustomer.checkOut(), 'Initial customer has no checkout').eq(null);
        expect(updatedCustomer.checkOut().toISOString(), 'Customer has updated the checkout date').eq(checkOut.toISOString());
        expect(updatedCustomer, 'it is the same customer, but with checkout date').to.eql(expected);
    });
    it('throws exception when checkout not greater than checkin', () => {
        let checkIn = new Date('2019-03-19T12:00:00+0000');
        const customer = CustomerDataBuilder.aCustomer().withCheckIn(checkIn).withCheckOut(null).build();
        expect(() => { customer.updateCheckOut(checkIn) }, 'Checkout and checkin are equal').to.throw(TypeError);

        let checkOut = new Date('2019-03-19T11:59:59+0000');
        expect(() => { customer.updateCheckOut(checkOut) }, 'Checkout happens before checkin').to.throw(TypeError);
    });
    it('returns the status', () => {
        const checkIn = new Date('2019-03-19T12:00:00+0000');
        const customer = CustomerDataBuilder.aCustomer().withCheckIn(checkIn).withCheckOut(null).build();
        expect(
            customer.status().equals(CustomerStatus.createActive()),
            'Customer has active a default status'
        ).eq(true);

        const checkoutCustomer = customer.updateCheckOut(new Date('2019-03-19T12:45:12+0000'));
        expect(
            checkoutCustomer.status().equals(CustomerStatus.createOut()),
            'Customer is out if it has defined the checkout date'
        ).eq(true);
    });
});
