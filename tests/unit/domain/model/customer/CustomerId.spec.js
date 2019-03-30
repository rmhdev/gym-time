import { expect } from 'chai'
import { CustomerId } from "../../../../../src/domain/model/customer/CustomerId";

describe('CustomerId', () => {
    it('can create a new random id when no value is defined', () => {
        const customerId = CustomerId.create();
        expect(customerId).to.be.an.instanceof(CustomerId);
    });
    it('can create an id with a defined value', () => {
        const customerId = CustomerId.create('my-fixed-id');
        expect(customerId.value).to.equal('my-fixed-id');
    });
    it('throws exception if id is empty', () => {
        expect(function () {
            return CustomerId.create('');
        }).to.throw(TypeError);
    });
    it('throws exception if id has empty values', () => {
        expect(function () {
            return CustomerId.create('   ');
        }).to.throw(TypeError);
    });
    it('throws exception if id is not a string', () => {
        let newCustomerWithDateAsId = function () {
            return CustomerId.create(new Date());
        };
        expect(newCustomerWithDateAsId).to.throw(TypeError);
    });
});
