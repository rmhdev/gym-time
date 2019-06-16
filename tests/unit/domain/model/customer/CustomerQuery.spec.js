import { expect } from 'chai'
import { CustomerCategory } from "@/domain/model/customer/CustomerCategory";
import { CustomerQuery } from "@/domain/model/customer/CustomerQuery";
import { CustomerDataBuilder } from "./CustomerDataBuilder";

describe('CustomerQuery', () => {
    it('is empty by default', () => {
        const query = new CustomerQuery();
        expect(query.toJSON()).to.eql({ value: {}, sortBy: {} });
    });
    it('returns in JSON the defined query', () => {
        let query = new CustomerQuery({ one: '1' }, { id: 'asc' });
        expect(query.toJSON()).to.eql({ value: { one: '1' }, sortBy: { id: 'asc' } });
    });
    it('creates a query from JSON', () => {
        const json = { value: { id: '1', name: 'hello' }, sortBy: { id: 'asc', name: 'desc' } };
        const query = CustomerQuery.fromJSON(json);

        expect(query.toJSON(), 'Return existing value').to.eql(json);
    });
    it('return a value by name, only if it exists', () => {
        let query = CustomerQuery.fromJSON({ value: { hello: 'world'} });
        expect(query.get('hello'), 'Return existing value').to.eq('world');
        expect(query.get('lorem'), 'Return null when value is not in the query').to.eq(null);
    });
    it('return a custom default value if the value does not exist', () => {
        const query = CustomerQuery.fromJSON();
        expect(query.get('lorem', 'hi'), 'Return custom default value').to.eql('hi');

        const date = new Date('2019-03-16T01:23:45');
        expect(query.get('lorem', date), 'Return custom object value').to.eql(date);
    });
    it('confirms if a field is in the query', () => {
        const query = CustomerQuery.fromJSON({ value: { hello: 'world'} });
        expect(query.has('hello'), 'Value exists').to.eq(true);
        expect(query.has('lorem'), 'Value does not exist').to.eq(false);
    });
    it('allows adding new filters, keeping immutability', () => {
        const query = CustomerQuery.fromJSON();
        const queryUpdated = query.add('lorem', 'ipsum');
        expect(queryUpdated).to.be.an.instanceof(CustomerQuery);
        expect(queryUpdated.get('lorem'), 'New query has the value').to.eq('ipsum');
        expect(query.get('hello'), 'Original query does not have the value').to.eq(null);
    });
    it('allows removing filters, keeping immutability', () => {
        const query = CustomerQuery.fromJSON({ value: { lorem: 'ipsum'} });
        const queryUpdated = query.remove('lorem');
        expect(queryUpdated).to.be.an.instanceof(CustomerQuery);
        expect(queryUpdated.get('lorem'), 'New query does not have the value').to.eq(null);
        expect(query.get('lorem'), 'Original query keeps the value').to.eq('ipsum');

        const queryUpdated2 = query.remove('does-not-exist');
        expect(queryUpdated2).to.be.an.instanceof(CustomerQuery);
        expect(queryUpdated2, 'Same value as original').to.eql(query);
    });
    it('return a sort value by name, only if it exists', () => {
        const query = CustomerQuery.fromJSON({ value: { hello: 'world' }, sortBy: { id: 'asc' } });
        expect(query.getSortBy('id'), 'Return direction for existing sort value').to.eq('asc');
        expect(query.getSortBy('lorem'), 'Return null when sort value is not in the query').to.eq(null);
    });
    it('return a custom sort value by if it does not exist', () => {
        const query = CustomerQuery.fromJSON({ value: { hello: 'world' }, sortBy: { id: 'asc' } });
        expect(query.getSortBy('lorem', 'ipsum')).to.eq('ipsum');
    });
    it('confirms if the query is sorted by a field name', () => {
        const query = CustomerQuery.fromJSON({ value: { hello: 'world' }, sortBy: { id: 'asc' } });
        expect(query.isSortedBy('id'), 'Sorting exists').to.eq(true);
        expect(query.isSortedBy('name'), 'Sorting does not exist').to.eq(false);
    });
    it('allows adding new sorting, keeping immutability', () => {
        const query = CustomerQuery.fromJSON();
        const queryUpdated = query.addSortBy('name', 'asc');
        expect(queryUpdated).to.be.an.instanceof(CustomerQuery);
        expect(queryUpdated.getSortBy('name'), 'New query has the sort field').to.eq('asc');
        expect(query.getSortBy('name'), 'Original query does not have the sortin field').to.eq(null);
    });
    it('allows removing sorting, keeping immutability', () => {
        const query = CustomerQuery.fromJSON({ sortBy: { name: 'desc'} });
        const queryUpdated = query.removeSortBy('name');
        expect(queryUpdated).to.be.an.instanceof(CustomerQuery);
        expect(queryUpdated.getSortBy('name'), 'New query does not have the sorting field').to.eq(null);
        expect(query.getSortBy('name'), 'Original query keeps the value').to.eq('desc');

        const queryUpdated2 = query.removeSortBy('does-not-exist');
        expect(queryUpdated2).to.be.an.instanceof(CustomerQuery);
        expect(queryUpdated2, 'Same value as original').to.eql(query);
    });
    it('checks if a customer complies with the query', () => {
        const customer = CustomerDataBuilder.aCustomer()
            .withId('123')
            .withName('Lorem Ipsum')
            .withCheckIn('2019-03-19T12:00:00+0000')
            .withCheckOut(null)
            .withCategory(new CustomerCategory('cat1'))
            .build()
        ;

        const queries = [
            { value: {}, expected: true, description: 'No filter' },
            { value: { id: '123' }, expected: true, description: 'Same id' },
            { value: { id: '1234' }, expected: false, description: 'Different id' },
            { value: { status: 'out' }, expected: false, description: 'Has checked out?' },
            { value: { status: 'active' }, expected: true, description: 'Is still active?' },
            { value: { status: 'deleted' }, expected: false, description: 'Has been deleted?' },
            { value: { status: '' }, expected: true, description: 'Any status' },
            { value: { name: 'Mr Unknown' }, expected: false, description: 'Different name' },
            { value: { name: 'lorem ipsum' }, expected: true, description: 'Same name' },
            { value: { name: 'LOREM' }, expected: true, description: 'First part of name' },
            { value: { name: 'iPSuM' }, expected: true, description: 'Last part of name' },
            { value: { name: '' }, expected: true, description: 'Any name' },
            { value: { category: 'cat1' }, expected: true, description: 'Same category' },
            { value: { category: 'zero' }, expected: false, description: 'Different category' },
            { value: { category: '' }, expected: true, description: 'Any category' },
            { value: { status: 'out', category: 'zero' }, expected: false, description: 'None' },
            { value: { status: 'active', category: 'cat1' }, expected: true, description: 'Both' },
            { value: { status: 'active', category: 'zero' }, expected: false, description: 'Only first' },
            { value: { status: 'out', category: 'cat1' }, expected: false, description: 'Only second' },
        ];

        queries.forEach(function (query) {
            expect(
                CustomerQuery.fromJSON({ value: query.value }).isAccepted(customer),
                query.description
            ).eq(query.expected);
        });
    });

    it('checks if a customer complies with the date defined in the query', () => {
        const customer = CustomerDataBuilder.aCustomer()
            .withId('123')
            .withName('Lorem Ipsum')
            .withCheckIn('2019-03-19T23:59:00+0000')
            .withCheckOut('2019-03-20T00:35:00+0000')
            .withCategory(new CustomerCategory('cat1'))
            .build()
        ;

        const queries = [
            { value: { date: '2019-03-18' }, expected: false, description: 'Date is before checkin' },
            { value: { date: '2019-03-19' }, expected: true, description: 'Date is same as checkin' },
            { value: { date: '2019-03-20' }, expected: true, description: 'Date is same as checkout' },
            { value: { date: '2019-03-21' }, expected: false, description: 'Date is after checkout' },
        ];

        queries.forEach(function (query) {
            expect(
                CustomerQuery.fromJSON({ value: query.value }).isAccepted(customer),
                query.description
            ).eq(query.expected);
        });
    });

    it('checks if a checkout customer complies with the query', () => {
        const customer = CustomerDataBuilder.aCustomer()
            .withId('123')
            .withName('Lorem Ipsum')
            .withCheckIn('2019-03-19T12:00:00+0000')
            .withCheckOut('2019-03-19T12:45:00+0000')
            .withCategory(new CustomerCategory('cat1'))
            .build()
        ;

        const queries = [
            { value: { status: '' }, expected: true, description: 'Any status' },
        ];

        queries.forEach(function (query) {
            expect(
                CustomerQuery.fromJSON({ value: query.value }).isAccepted(customer),
                query.description
            ).eq(query.expected);
        });
    });
    it('returns the default query', () => {
        const expected = CustomerQuery.fromJSON(
            { value: { status: 'active' }, sortBy: { checkIn: 'desc' } }
        );
        expect(CustomerQuery.default(), 'Default query').to.eql(expected);
    });

    it('allows comparing two customers based on query sortBy', () => {
        const customer1 = CustomerDataBuilder.aCustomer()
            .withId('1')
            .withName('ABBA')
            .withCheckIn('2019-03-19T12:00:00+0000')
            .withCheckOut('2019-03-19T12:55:55+0000')
            .build()
        ;
        const customer2 = CustomerDataBuilder.aCustomer()
            .withId('2')
            .withName('ZZ top')
            .withCheckIn('2019-03-19T12:11:11+0000')
            .withCheckOut('2019-03-19T12:44:44+0000')
            .build()
        ;

        const queryNameAsc = CustomerQuery.fromJSON().addSortBy('name', 'asc');
        expect(queryNameAsc.compare(customer1, customer2), 'Name asc, A < B').to.eq(-1);
        expect(queryNameAsc.compare(customer1, customer1), 'Name asc, A = B').to.eq(0);
        expect(queryNameAsc.compare(customer2, customer1), 'Name asc, A > B').to.eq(1);

        const queryNameDesc = CustomerQuery.fromJSON().addSortBy('name', 'desc');
        expect(queryNameDesc.compare(customer1, customer2), 'Name desc, A < B').to.eq(1);
        expect(queryNameDesc.compare(customer1, customer1), 'Name desc, A = B').to.eq(0);
        expect(queryNameDesc.compare(customer2, customer1), 'Name desc, A > B').to.eq(-1);

        const queryIdAsc = CustomerQuery.fromJSON().addSortBy('id', 'asc');
        expect(queryIdAsc.compare(customer1, customer2), 'Id asc, A < B').to.eq(-1);
        expect(queryIdAsc.compare(customer1, customer1), 'Id asc, A = B').to.eq(0);
        expect(queryIdAsc.compare(customer2, customer1), 'Id asc, A > B').to.eq(1);

        const queryIdDesc = CustomerQuery.fromJSON().addSortBy('id', 'desc');
        expect(queryIdDesc.compare(customer1, customer2), 'Id desc, A < B').to.eq(1);
        expect(queryIdDesc.compare(customer1, customer1), 'Id desc, A = B').to.eq(0);
        expect(queryIdDesc.compare(customer2, customer1), 'Id desc, A > B').to.eq(-1);

        const queryCheckinAsc = CustomerQuery.fromJSON().addSortBy('checkIn', 'asc');
        expect(queryCheckinAsc.compare(customer1, customer2), 'Checkin asc, A < B').to.eq(-1);
        expect(queryCheckinAsc.compare(customer1, customer1), 'Checkin asc, A = B').to.eq(0);
        expect(queryCheckinAsc.compare(customer2, customer1), 'Checkin asc, A > B').to.eq(1);

        const queryCheckinDesc = CustomerQuery.fromJSON().addSortBy('checkIn', 'desc');
        expect(queryCheckinDesc.compare(customer1, customer2), 'Checkin desc, A < B').to.eq(1);
        expect(queryCheckinDesc.compare(customer1, customer1), 'Checkin desc, A = B').to.eq(0);
        expect(queryCheckinDesc.compare(customer2, customer1), 'Checkin desc, A > B').to.eq(-1);

        const queryDefaultAsc = CustomerQuery.fromJSON();
        expect(queryDefaultAsc.compare(customer1, customer2), 'Default uses id asc, A < B').to.eq(-1);
        expect(queryDefaultAsc.compare(customer1, customer1), 'Default uses id asc, A = B').to.eq(0);
        expect(queryDefaultAsc.compare(customer2, customer1), 'Default uses id asc, A > B').to.eq(1);
    });

    it('throws exception when comparing two parameters that are not customers', () => {
        const query = CustomerQuery.fromJSON();
        const customer = CustomerDataBuilder.aCustomer().build();

        expect(() => { query.compare('lorem', 'ipsum') }).to.throw(TypeError);
        expect(() => { query.compare(customer, 'ipsum') }).to.throw(TypeError);
        expect(() => { query.compare('lorem', customer) }).to.throw(TypeError);
    });
});
