import { expect } from 'chai'
import { CustomerRepository } from "@/domain/model/customer/CustomerRepository"
import { Customer } from "@/domain/model/customer/Customer";
import { CustomerDataBuilder } from "./CustomerDataBuilder";
import { CustomerNoFoundException } from "@/domain/model/customer/CustomerNotFoundException";
import { CustomerIdNotUniqueException } from "@/domain/model/customer/CustomerIdNotUniqueException";
import { CustomerTypeException } from "@/domain/model/customer/CustomerTypeException";
import { CustomerQuery } from "@/domain/model/customer/CustomerQuery";

describe('CustomerRepository', () => {
    it('should be empty when created', () => {
        let repository = new CustomerRepository();
        expect(repository.count()).to.equal(0);
        expect(repository.all()).to.be.an('Array').that.is.empty;
    });
    it('should save a customer when added', () => {
        let repository = new CustomerRepository();
        let customer = CustomerDataBuilder.aCustomer().withName('Name One').build();
        repository.add(customer);
        expect(repository.count()).to.equal(1);
        expect(repository.all()[0]).to.be.an.instanceof(Customer);
    });
    it('throws an exception when adding an element different to Customer', () => {
        let repository = new CustomerRepository();

        expect(() => { repository.add() }, 'Adding nothing').to.throw(CustomerTypeException);
        expect(() => { repository.add(new Date()) }, 'Adding an object Date ').to.throw(CustomerTypeException);
        expect(() => { repository.add('Customer') }, 'Adding a string').to.throw(CustomerTypeException);
        expect(() => { repository.add(null) }, 'Adding a null').to.throw(CustomerTypeException);
    });
    it('returns a customer looking by id', () => {
        let repository = new CustomerRepository();
        const customer = CustomerDataBuilder.aCustomer().withId('111').withName('Lorem Ipsum').build();
        repository.add(customer);

        const result = repository.findById('111');
        expect(result).to.eql(customer);
    });
    it('throws error when no customer is found by id', () => {
        let repository = new CustomerRepository();
        const customer = CustomerDataBuilder.aCustomer().withId('111').withName('Lorem Ipsum').build();
        repository.add(customer);

        expect(() => { repository.findById('aaa') }).to.throw(CustomerNoFoundException);
    });
    it('returns a list of customers looking by ids', () => {
        let repository = new CustomerRepository();
        const customer1 = CustomerDataBuilder.aCustomer().withId('111').withName('Lorem 1').build();
        const customer2 = CustomerDataBuilder.aCustomer().withId('222').withName('Lorem 2').build();
        const customer3 = CustomerDataBuilder.aCustomer().withId('333').withName('Lorem 3').build();
        repository.add(customer1);
        repository.add(customer2);
        repository.add(customer3);
        const result = repository.findById(['111', '333']);
        expect(result).to.eql([customer1, customer3]);
    });
    it('removes a customer by id', () => {
        let repository = new CustomerRepository();
        const customer = CustomerDataBuilder.aCustomer().withId('111').build();

        repository.add(customer);
        expect(repository.count(), 'The customer is added correctly').to.equal(1);

        repository.remove('111');
        expect(repository.count(), 'The customer is removed correctly').to.equal(0);
    });
    it('throws error when trying to remove a non existing customer', () => {
        let repository = new CustomerRepository();
        const customer = CustomerDataBuilder.aCustomer().withId('111').build();

        repository.add(customer);
        expect(repository.count(), 'The customer is added correctly').to.equal(1);

        expect(() => { repository.remove('222') }).to.throw(CustomerNoFoundException);
    });
    it('throws error when adding a customer which id is already in the repository', () => {
        let repository = new CustomerRepository();
        const customer = CustomerDataBuilder.aCustomer().withId('111').build();
        repository.add(customer);

        expect(() => { repository.add(customer) }).to.throw(CustomerIdNotUniqueException);
    });
    it('should return the list of all customers sorted by checkin date, latest first', () => {
        let repository = new CustomerRepository();

        repository.add(CustomerDataBuilder.aCustomer().withId('1').withName('First').withCheckIn('2019-03-19T12:10:00.000Z').build());
        repository.add(CustomerDataBuilder.aCustomer().withId('2').withName('Second').withCheckIn('2019-03-19T12:20:00.000Z').build());
        repository.add(CustomerDataBuilder.aCustomer().withId('3').withName('Third').withCheckIn('2019-03-19T12:30:00.000Z').build());
        const all = repository.all();

        expect(all[0].name.value, 'Customer ' + all[0].id.value + ', checkin: ' + all[0].checkIn().toString()).eq('Third');
        expect(all[1].name.value, 'Customer ' + all[1].id.value + ', checkin: ' + all[1].checkIn().toString()).eq('Second');
        expect(all[2].name.value, 'Customer ' + all[2].id.value + ', checkin: ' + all[2].checkIn().toString()).eq('First');
    });

    it('allows updating a customer', () => {
       const customer = CustomerDataBuilder.aCustomer()
           .withId('1')
           .withName('First')
           .withCheckIn('2019-03-19T12:10:00.000Z')
           .withCheckOut(null)
           .build();
       let repository = new CustomerRepository();
       repository.add(customer);

       const checkOut = new Date('2019-03-19T12:55:33.000Z');
       const updatedCustomer = customer.updateCheckOut(checkOut);
       repository.update(updatedCustomer);

        expect(repository.count()).eq(1);
        expect(repository.findById(customer.id).checkOut().toISOString()).eq(checkOut.toISOString());
    });
    it('throws error when updating a non existing customer', () => {
        let repository = new CustomerRepository();
        repository.add(
            CustomerDataBuilder.aCustomer().withId('111').build()
        );
        const newCustomer = CustomerDataBuilder.aCustomer().withId('zzz').build();

        expect(() => { repository.update(newCustomer) }).to.throw(CustomerNoFoundException);
    });
    it('throws error when trying to update something different from a customer', () => {
        let repository = new CustomerRepository();

        expect(() => { repository.update() }, 'Updating undefined customer').to.throw(CustomerTypeException);
        expect(() => { repository.update(new Date()) }, 'Updating a Date instead of a Customer').to.throw(CustomerTypeException);
    });
    it('allows filtering results by query', () => {
        const customer1 = CustomerDataBuilder.aCustomer().withId('1').withName('First').withCheckIn('2019-03-19T12:10:00.000Z').build();
        const customer2 = CustomerDataBuilder.aCustomer().withId('2').withName('Second').withCheckIn('2019-03-19T12:20:00.000Z').withCheckOut('2019-03-19T12:45:00.000Z').build();
        const customer3 = CustomerDataBuilder.aCustomer().withId('3').withName('Third').withCheckIn('2019-03-19T12:30:00.000Z').build();
        const customer4 = CustomerDataBuilder.aCustomer().withId('4').withName('Fourth').withCheckIn('2019-03-19T12:40:00.000Z').build();
        let repository = new CustomerRepository();
        repository.add(customer1);
        repository.add(customer2);
        repository.add(customer3);
        repository.add(customer4);

        expect(
            repository.find(CustomerQuery.fromJSON()),
            'Empty filter results all results'
        ).to.eql([customer1, customer2, customer3, customer4]);

        expect(
            repository.find(CustomerQuery.fromJSON({ value: { status: 'active' } })),
            'Filter by status: only active users'
        ).to.eql([customer1, customer3, customer4]);
    });
    it('throws error when trying to find with an incorrect query type', () => {
        let repository = new CustomerRepository();

        expect(() => { repository.find(new Date()) }, 'Find with incorrect query type "Date"').to.throw(TypeError);
        expect(() => { repository.find() }, 'Find with undefined query type').to.throw(TypeError);
    });

    it('logs the number of changes', () => {
        const customer1 = CustomerDataBuilder.aCustomer().withId('1').withName('First').withCheckIn('2019-03-19T12:10:00.000Z').build();
        const customer2 = CustomerDataBuilder.aCustomer().withId('2').withName('Second').withCheckIn('2019-03-19T12:20:00.000Z').build();
        let repository = new CustomerRepository();
        expect(repository.version, 'New repository').equal(0);

        repository.add(customer1);
        expect(repository.version, 'Add first customer').equal(1);

        repository.add(customer2);
        expect(repository.version, 'Add second customer').equal(2);

        repository.update(customer2.updateCheckOut(new Date('2019-03-19T12:55:22.000Z')));
        expect(repository.version, 'Update second customer').equal(3);

        repository.remove(customer2.id);
        expect(repository.version, 'Remove second customer').equal(4);
    })
});
