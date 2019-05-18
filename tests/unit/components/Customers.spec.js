import chai, {expect} from 'chai'
import {createLocalVue, shallowMount} from '@vue/test-utils'
import Customers from '@/components/Customers.vue'
import {CustomerDataBuilder} from "./../domain/model/customer/CustomerDataBuilder";
import storeConfig from "@/store/config";
import cloneDeep from "lodash.clonedeep";
import Vuex from "vuex";
import Search from "@/components/Search";
import { CustomerCategory } from "@/domain/model/customer/CustomerCategory";

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Customers.vue', () => {

    let localStoreConfig;
    let store;

    beforeEach(() => {
        localStoreConfig = cloneDeep(storeConfig);
        localStoreConfig.state.categories = ['cat1', 'cat2', 'cat3'];
        localStoreConfig.actions.updateCustomerQueryValue = chai.spy();
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
        store.state.customerRepository.update(customer2.updateCheckOut(new Date('2019-03-16T01:45:22')));

        expect(
            wrapper.findAll('.gym-customer').length,
            'Checkout customer should not be displayed by default'
        ).eq(1);
    });

    it('renders a search component', () => {
        const wrapper = shallowMount(Customers, {store, localVue});
        expect(wrapper.findAll(Search).length).eq(1);
    });

    it('updates the list when searching by category', () => {
        const checkin = '2019-03-16T01:00:11';
        let customer1 = CustomerDataBuilder.aCustomer().withId('1').withName('One').withCheckIn(checkin).withCategory(new CustomerCategory('cat1')).build();
        let customer2 = CustomerDataBuilder.aCustomer().withId('2').withName('Two').withCheckIn(checkin).withCategory(new CustomerCategory('cat2')).build();

        store.state.customerRepository.add(customer1);
        store.state.customerRepository.add(customer2);

        const wrapper = shallowMount(Customers, {store, localVue});
        wrapper.find(Search).vm.$emit('search:category', { value: 'cat1' });

        expect(
            localStoreConfig.actions.updateCustomerQueryValue,
            'Action should be dispatched'
        ).to.have.been.called();

        expect(
            wrapper.findAll('.gym-customer').length,
            'Show single customer with category "cat1"'
        ).eq(1);
    });
});
