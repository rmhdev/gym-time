import chai, {expect} from 'chai'
import {createLocalVue, shallowMount} from '@vue/test-utils'
import Customers from '@/components/Customers.vue'
import {CustomerDataBuilder} from "./../domain/model/customer/CustomerDataBuilder";
import storeConfig from "@/store/config";
import lodash from "lodash";
import Vuex from "vuex";
import Search from "@/components/Search";
import SearchText from "@/components/SearchText";
import Sort from "@/components/Sort";
import Customer from "@/components/Customer";
import {CustomerStatus} from "@/domain/model/customer/CustomerStatus";

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Customers.vue', () => {

    let localStoreConfig;
    let store;

    beforeEach(() => {
        localStoreConfig = lodash.cloneDeep(storeConfig);
        localStoreConfig.state.categories = ['cat1', 'cat2', 'cat3'];
        localStoreConfig.actions.updateCustomerQueryValue = chai.spy();
        localStoreConfig.actions.updateCustomerQuerySort = chai.spy();
        store = new Vuex.Store(localStoreConfig);
    });

    it('renders a message when the customers list is empty', () => {
        const wrapper = shallowMount(Customers, {store, localVue});
        expect(wrapper.findAll('.gym-customers').length).eq(1);
        expect(wrapper.findAll('.gym-customers .gym-customer').length).eq(0);

        expect(wrapper.findAll('.gym-empty').length).eq(1);
        expect(wrapper.findAll('.gym-empty .gym-title').length).eq(1);
    });

    it('renders a list with a single customer', () => {
        store.state.customerRepository.add(CustomerDataBuilder.aCustomer().build());
        const wrapper = shallowMount(Customers, {store, localVue});

        expect(wrapper.findAll('.gym-customer').length).eq(1);
    });

    it('should not show the empty message when the list has customers', () => {
        store.state.customerRepository.add(CustomerDataBuilder.aCustomer().build());
        const wrapper = shallowMount(Customers, {store, localVue});

        expect(wrapper.findAll('.gym-empty').length).eq(0);
    });

    it('renders only active users by default', () => {
        const checkin = '2019-03-16T01:00:11';
        const checkout = '2019-03-16T01:45:22';
        store.state.customerRepository.add(
            CustomerDataBuilder.aCustomer().withId('1').withName('One').withCheckIn(checkin).build()
        );
        store.state.customerRepository.add(
            CustomerDataBuilder.aCustomer().withId('2').withName('Two').withCheckIn(checkin).withCheckOut(checkout).build()
        );
        const wrapper = shallowMount(Customers, {store, localVue});

        expect(wrapper.findAll('.gym-customer').length).eq(1);
    });

    it('updates the list when a customer changes', () => {
        const checkin = '2019-03-16T01:00:11';
        let customer1 = CustomerDataBuilder.aCustomer().withId('1').withName('One').withCheckIn(checkin).build();
        let customer2 = CustomerDataBuilder.aCustomer().withId('2').withName('Two').withCheckIn(checkin).build();
        store.state.customerRepository.add(customer1);
        store.state.customerRepository.add(customer2);

        const wrapper = shallowMount(Customers, {store, localVue});
        expect(wrapper.findAll('.gym-customer').length).eq(2);
        store.state.customerRepository.update(customer2.update({ checkout: new Date('2019-03-16T01:45:22') }));

        expect(
            wrapper.findAll('.gym-customer').length,
            'Checkout customer should not be displayed by default'
        ).eq(1);
    });

    it('renders search components', () => {
        const wrapper = shallowMount(Customers, {store, localVue});
        expect(wrapper.findAll(Search).length).eq(2);
        expect(wrapper.findAll(SearchText).length).eq(1);
    });

    it('updates the list when searching by category', () => {
        const checkin = '2019-03-16T01:00:11';
        let customer1 = CustomerDataBuilder.aCustomer().withId('1').withName('One').withCheckIn(checkin).withCategory('cat1').build();
        let customer2 = CustomerDataBuilder.aCustomer().withId('2').withName('Two').withCheckIn(checkin).withCategory('cat2').build();

        store.state.customerRepository.add(customer1);
        store.state.customerRepository.add(customer2);

        const wrapper = shallowMount(Customers, {store, localVue});
        wrapper.find('#search_category').vm.$emit('search:by', 'cat1');

        expect(
            localStoreConfig.actions.updateCustomerQueryValue,
            'Action should be dispatched'
        ).to.have.been.called();
        // TODO: test payload.
    });

    it('updates the list when searching by status', () => {
        const checkin = '2019-03-16T01:00:11';
        const checkout = '2019-03-16T01:45:22';
        let customer1 = CustomerDataBuilder.aCustomer().withId('1').withName('One').withCheckIn(checkin).build();
        let customer2 = CustomerDataBuilder.aCustomer().withId('2').withName('Two').withCheckIn(checkin).withCheckOut(checkout).build();

        store.state.customerRepository.add(customer1);
        store.state.customerRepository.add(customer2);

        const wrapper = shallowMount(Customers, {store, localVue});
        wrapper.find('#search_status').vm.$emit('search:by', 'out');

        expect(
            localStoreConfig.actions.updateCustomerQueryValue,
            'Action should be dispatched'
        ).to.have.been.called();
        // TODO: test payload.
    });

    it('updates the list when searching by name', () => {
        const checkin = '2019-03-16T01:00:11';
        const checkout = '2019-03-16T01:45:22';
        let customer1 = CustomerDataBuilder.aCustomer().withId('1').withName('One').withCheckIn(checkin).build();
        let customer2 = CustomerDataBuilder.aCustomer().withId('2').withName('Two').withCheckIn(checkin).withCheckOut(checkout).build();

        store.state.customerRepository.add(customer1);
        store.state.customerRepository.add(customer2);

        const wrapper = shallowMount(Customers, {store, localVue});
        wrapper.find(SearchText).vm.$emit('search:by', 'tw');

        expect(
            localStoreConfig.actions.updateCustomerQueryValue,
            'Action should be dispatched'
        ).to.have.been.called();
        // TODO: test payload.
    });

    it('has the customer search filters by default', () => {
        store.state.customerQuery = {
            value: {
                category: 'cat3',
                status: 'out',
                name: 'lorem'
            }
        };
        const wrapper = shallowMount(Customers, {store, localVue});

        expect(
            wrapper.find('#search_category').props().value,
            'Filter by default category'
        ).to.eq('cat3');

        expect(
            wrapper.find('#search_status').props().value,
            'Filter by default status'
        ).to.eq('out');

        expect(
            wrapper.find(SearchText).props().value,
            'Filter by default status'
        ).to.eq('lorem');
    });

    it('renders sort component', () => {
        const wrapper = shallowMount(Customers, {store, localVue});

        expect(wrapper.findAll(Sort).length).eq(1);
    });

    it('has the sort button active by default', () => {
        store.state.customerQuery = {
            sortBy: { name: 'asc' }
        };
        const wrapper = shallowMount(Customers, {store, localVue});

        expect(wrapper.find(Sort).props().selected, 'Sort by correct value').to.eql('name');
        expect(wrapper.find(Sort).props().order, 'Sort by correct order').to.eql('asc');
    });

    it('displays the list sorted by the default value', () => {
        const checkin = '2019-03-16T01:00:11';
        const category = 'cat1';

        let customer1 = CustomerDataBuilder.aCustomer().withId('1').withName('AC DC').withCheckIn(checkin).withCategory(category).build();
        let customer2 = CustomerDataBuilder.aCustomer().withId('2').withName('Melvins').withCheckIn(checkin).withCategory(category).build();
        let customer3 = CustomerDataBuilder.aCustomer().withId('3').withName('ZZ top').withCheckIn(checkin).withCategory(category).build();

        store.state.customerRepository.add(customer1);
        store.state.customerRepository.add(customer2);
        store.state.customerRepository.add(customer3);

        store.state.customerQuery = {
            sortBy: { name: 'desc' }
        };
        const wrapper = shallowMount(Customers, {store, localVue});

        let customers = wrapper.findAll(Customer);
        expect(customers.at(0).props().customer, 'First element, sorted').to.eql(customer3);
        expect(customers.at(1).props().customer, 'Second element, sorted').to.eql(customer2);
        expect(customers.at(2).props().customer, 'Third element, sorted').to.eql(customer1);
    });

    it('sorts the list when clicking a sort button', () => {
        const category = 'cat1';

        let customer1 = CustomerDataBuilder.aCustomer().withId('1').withName('AC DC').withCheckIn('2019-03-16T01:00:33').withCategory(category).build();
        let customer2 = CustomerDataBuilder.aCustomer().withId('2').withName('Melvins').withCheckIn('2019-03-16T01:00:22').withCategory(category).build();
        let customer3 = CustomerDataBuilder.aCustomer().withId('3').withName('ZZ top').withCheckIn('2019-03-16T01:00:11').withCategory(category).build();

        store.state.customerRepository.add(customer1);
        store.state.customerRepository.add(customer2);
        store.state.customerRepository.add(customer3);

        store.state.customerQuery = {
            sortBy: { checkIn: 'asc' }
        };
        const wrapper = shallowMount(Customers, {store, localVue});
        wrapper.find(Sort).vm.$emit('sort:by', 'checkIn', 'asc');

        expect(
            localStoreConfig.actions.updateCustomerQuerySort,
            'Action should be dispatched'
        ).to.have.been.called();
        // TODO: test payload.

        let customers = wrapper.findAll(Customer);
        expect(customers.at(0).props().customer, 'First element, sorted by checkIn asc').to.eql(customer3);
        expect(customers.at(1).props().customer, 'Second element, sorted by checkIn asc').to.eql(customer2);
        expect(customers.at(2).props().customer, 'Third element, sorted by checkIn asc').to.eql(customer1);
    });

    it('has a default list of statuses for selectable customers', () => {
        const wrapper = shallowMount(Customers, {store, localVue});
        const statusActive = CustomerStatus.createActive().value;

        expect(wrapper.props('statuses'), 'default list of statuses').to.eql([statusActive]);
    });

    it('defines if customers are disabled based on statuses list', () => {
        const customer = CustomerDataBuilder.aCustomer()
            .withId('1')
            .withName('One')
            .withCheckIn('2019-03-16T01:00:11')
            .build();
        store.state.customerRepository.add(customer);
        const statuses = [CustomerStatus.createOut().value, CustomerStatus.createDeleted().value];
        const wrapper = shallowMount(Customers, {store, localVue, propsData : {
            statuses: statuses
        }});

        expect(
            wrapper.find(Customer).props('disabled'),
            'Customer is disabled (' + customer.status().value + ' is not in [' + statuses.join(', ') + ']'
        ).eq(true);
    });
});
