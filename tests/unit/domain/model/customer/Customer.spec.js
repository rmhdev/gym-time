import { expect } from 'chai'
import { CustomerDataBuilder } from './CustomerDataBuilder'
import { Customer } from "@/domain/model/customer/Customer";
import { CustomerStatus } from "@/domain/model/customer/CustomerStatus";

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
        const customer = Customer.create('Lorem Ipsum', 'category');
        expect(customer).to.be.instanceOf(Customer);
        expect(customer.name.value).eq('Lorem Ipsum');
        expect(customer.category).eq('category');
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
    it('throws exception when the category type is incorrect', () => {
        expect(function () {
            CustomerDataBuilder.aCustomer().withCategory(new Date()).build();
        }).to.throw(TypeError);
    });

    it('allows updating values, maintaining immutability', () => {
        let checkIn = new Date('2019-03-19T12:00:00+0000');
        let checkOut = new Date('2019-03-19T12:45:12+0000');
        const initialCustomer = CustomerDataBuilder.aCustomer()
            .withId('111')
            .withName('Initial Name')
            .withCheckIn(checkIn)
            .withCheckOut(checkOut)
            .withCategory('one')
            .build();
        const expectedCustomer = CustomerDataBuilder.aCustomer()
            .withId('111')
            .withCheckIn(checkIn)
            .withName('Updated Name')
            .withCheckOut(new Date('2019-03-19T12:59:59+0000'))
            .withCategory('two')
            .build();

        const updatedCustomer = initialCustomer.update({
            id: 'ignored',
            checkin: 'ignored',
            name: expectedCustomer.name,
            checkout: expectedCustomer.checkOut(),
            category: expectedCustomer.category
        });

        expect(updatedCustomer, 'it is the same customer, but with updated values').to.eql(expectedCustomer);
        expect(initialCustomer.name.value, 'name of initial customer is immutable').to.eql('Initial Name');
        expect(initialCustomer.checkOut(), 'checkout date of initial customer is immutable').to.eql(checkOut);
        expect(initialCustomer.category, 'name of initial customer is immutable').to.eql('one');
    });

    it('allows updating the checkout date, maintaining immutability', () => {
        let checkIn = new Date('2019-03-19T12:00:00+0000');
        let checkOut = new Date('2019-03-19T12:45:12+0000');
        const initialCustomer = CustomerDataBuilder.aCustomer()
            .withId('111')
            .withCheckIn(checkIn)
            .withCheckOut(null)
            .build();
        const updatedCustomer = initialCustomer.update({ checkout: checkOut });
        const expected = CustomerDataBuilder.aCustomer()
            .withId('111')
            .withCheckIn(checkIn)
            .withCheckOut(checkOut)
            .build();

        expect(initialCustomer.checkOut(), 'Initial customer has no checkout').eq(null);
        expect(updatedCustomer.checkOut().toISOString(), 'Customer has updated the checkout date').eq(checkOut.toISOString());
        expect(updatedCustomer, 'it is the same customer, but with checkout date').to.eql(expected);
    });
    it('allows updating to null the checkout date, maintaining immutability', () => {
        let checkIn = new Date('2019-03-19T12:00:00+0000');
        let checkOut = new Date('2019-03-19T12:45:12+0000');
        const initialCustomer = CustomerDataBuilder.aCustomer()
            .withId('111')
            .withCheckIn(checkIn)
            .withCheckOut(checkOut)
            .build();
        const updatedCustomer = initialCustomer.update({ checkout: null });
        const expected = CustomerDataBuilder.aCustomer()
            .withId('111')
            .withCheckIn(checkIn)
            .withCheckOut(null)
            .build();

        expect(initialCustomer.checkOut().toISOString(), 'Initial customer has a checkout date').eq(checkOut.toISOString());
        expect(updatedCustomer.checkOut(), 'Customer has updated the checkout date as null').eq(null);
        expect(updatedCustomer, 'it is the same customer, but with null checkout date').to.eql(expected);
    });
    it('throws exception when updating the checkout date with incorrect type', () => {
        const customer = CustomerDataBuilder.aCustomer().withCheckIn('2019-03-19T12:00:00+0000').withCheckOut(null).build();

        expect(() => { customer.update({ checkout: 'hello' }) }, 'Update checkout with string').to.throw(TypeError);
        expect(() => { customer.update({ checkout: 123456 }) }, 'Update checkout with number').to.throw(TypeError);
        expect(() => { customer.update({ checkout: {} }) }, 'Update checkout with object').to.throw(TypeError);
    });
    it('throws exception when checkout not greater than checkin', () => {
        let checkIn = new Date('2019-03-19T12:00:00+0000');
        const customer = CustomerDataBuilder.aCustomer().withCheckIn(checkIn).withCheckOut(null).build();
        expect(() => { customer.update({ checkout: checkIn }) }, 'Checkout and checkin are equal').to.throw(TypeError);

        let checkout = new Date('2019-03-19T11:59:59+0000');
        expect(() => { customer.update({ checkout: checkout }) }, 'Checkout happens before checkin').to.throw(TypeError);
    });
    it('returns the status', () => {
        const checkIn = new Date('2019-03-19T12:00:00+0000');
        const customer = CustomerDataBuilder.aCustomer().withCheckIn(checkIn).withCheckOut(null).build();
        expect(
            customer.status().equals(CustomerStatus.createActive()),
            'Customer has active a default status'
        ).eq(true);

        const checkoutCustomer = customer.update({ checkout: new Date('2019-03-19T12:45:12+0000') });
        expect(
            checkoutCustomer.status().equals(CustomerStatus.createOut()),
            'Customer is out if it has defined the checkout date'
        ).eq(true);
    });
});
