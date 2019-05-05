import { expect } from 'chai'
import { CustomerCategory } from "@/domain/model/customer/CustomerCategory";

describe('CustomerCategory', () => {
    it('creates a category with id and name', () => {
        const category = new CustomerCategory('lorem', 'Lorem Ipsum');
        expect(category.value).to.equal('lorem');
        expect(category.name).to.equal('Lorem Ipsum');
    });
    it('throws exception if slug is empty', () => {
        expect(function () {
            return new CustomerCategory('', 'Lorem Ipsum');
        }).to.throw(TypeError);
    });
    it('throws exception if slug is not a string', () => {
        expect(function () {
            return new CustomerCategory(new Date(), 'Lorem Ipsum');
        }).to.throw(TypeError);
    });
    it('defines name as value when name is empty', () => {
        const categoryA = new CustomerCategory('lorem');
        expect(categoryA.name, 'Name is empty').to.equal('lorem');

        const categoryB = new CustomerCategory('lorem', null);
        expect(categoryB.name, 'Name is empty').to.equal('lorem');
    });
    it('throws exception when name is not string', () => {
        expect(function () {
            return new CustomerCategory('test', new Date());
        }).to.throw(TypeError);
    });
    it('returns true when compared with the same value', () => {
        const category = new CustomerCategory('lorem', 'Lorem Ipsum');
        expect(category.equals('lorem'), 'Comparing equal value').to.equal(true);
        expect(category.equals(category), 'Comparing equal object').to.equal(true);
    });
    it('returns false when compared with a different value', () => {
        const category = new CustomerCategory('lorem', 'Lorem Ipsum');
        expect(category.equals('aaa'), 'comparing different id string').to.equal(false);
        const other = new CustomerCategory('other', 'Other Category');
        expect(category.equals(other), 'comparing different category').to.equal(false);
        expect(category.equals(new Date()), 'comparing different instance').to.equal(false);
    });
});
