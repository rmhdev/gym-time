import { expect } from 'chai'
import { CustomerQuery } from "@/domain/model/customer/CustomerQuery";

describe('CustomerQuery', () => {
    it('is empty by default', () => {
        const query = new CustomerQuery();
        expect(query.toJSON()).to.eql({});
    });
    it('return a value by name, only if it exists', () => {
        const query = new CustomerQuery({ hello: 'world' });
        expect(query.get('hello'), 'Return existing value').to.eql('world');
        expect(query.get('lorem'), 'Return null when value is not in the query').to.eql(null);
    });
    it('return a custom default value if the value does not exist', () => {
        const query = new CustomerQuery();
        expect(query.get('lorem', 'hi'), 'Return custom default value').to.eql('hi');

        const date = new Date('2019-03-16T01:23:45');
        expect(query.get('lorem', date), 'Return custom object value').to.eql(date);
    });
    it('confirms if a field is in the query', () => {
        const query = new CustomerQuery({ hello: 'world' });
        expect(query.has('hello'), 'Value exists').to.eq(true);
        expect(query.has('lorem'), 'Value does not exist').to.eq(false);
    });
    it('allows adding new filters, keeping immutability', () => {
        const query = new CustomerQuery();
        const queryUpdated = query.add('lorem', 'ipsum');
        expect(queryUpdated).to.be.an.instanceof(CustomerQuery);
        expect(queryUpdated.get('lorem'), 'New query has the value').to.eq('ipsum');
        expect(query.get('hello'), 'Original query does not have the value').to.eq(null);
    });
    it('allows removing filters, keeping immutability', () => {
        const query = new CustomerQuery({ 'lorem': 'ipsum' });
        const queryUpdated = query.remove('lorem');
        expect(queryUpdated).to.be.an.instanceof(CustomerQuery);
        expect(queryUpdated.get('lorem'), 'New query does not have the value').to.eq(null);
        expect(query.get('lorem'), 'Original query keeps the value').to.eq('ipsum');

        const queryUpdated2 = query.remove('does-not-exist');
        expect(queryUpdated2).to.be.an.instanceof(CustomerQuery);
        expect(queryUpdated2, 'Same value as original').to.eql(query);
    });

});
