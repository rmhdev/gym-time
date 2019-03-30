import { expect } from 'chai'
import { CustomerIdDataBuilder } from './CustomerIdDataBuilder'
import {CustomerId} from "../../../../../src/domain/model/customer/CustomerId";

describe('CustomerId', () => {
    it('throws exception if id is empty', () => {
        expect(function () {
            return CustomerIdDataBuilder.aCustomerId().withId('').build();
        }).to.throw(TypeError);
    });
    it('throws exception if id has empty values', () => {
        expect(function () {
            return CustomerIdDataBuilder.aCustomerId().withId('  ').build();
        }).to.throw(TypeError);
    });
    it('throws exception if id is not a string', () => {
        let newCustomerWithDateAsId = function () {
            return CustomerIdDataBuilder.aCustomerId().withId(new Date()).build();
        };
        expect(newCustomerWithDateAsId).to.throw(TypeError);
    });
    it('returns the value of the id', () => {
        const customerId = CustomerIdDataBuilder.aCustomerId().withId('loremipsum').build();
        expect(customerId.value).to.equal('loremipsum');
    });
    it('can create a new random id when no value is defined', () => {
        const customerId = CustomerId.create();
        expect(customerId).to.be.an.instanceof(CustomerId);
    });
    it('can create an id with a defined value', () => {
        const customerId = CustomerId.create('my-fixed-id');
        expect(customerId.value).to.equal('my-fixed-id');
    });
});
