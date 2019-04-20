import {expect} from 'chai'
import {createLocalVue, shallowMount} from '@vue/test-utils'
import Customers from '@/components/Customers.vue'
import {CustomerDataBuilder} from "./domain/model/customer/CustomerDataBuilder";
import storeConfig from "@/store/config";
import cloneDeep from "lodash.clonedeep";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Customers.vue', () => {

    let store;

    beforeEach(() => {
        store = new Vuex.Store(cloneDeep(storeConfig));
    });

    it('renders a message when the customers list is empty', () => {
        const wrapper = shallowMount(Customers, {store, localVue});
        expect(wrapper.findAll('.gym-customers').length).eq(1);
        expect(wrapper.findAll('.gym-customers .gym-customer').length).eq(0);

        expect(wrapper.findAll('.gym-empty').length).eq(1);
        expect(wrapper.findAll('.gym-empty .gym-title').length).eq(1);
    });

    it('renders a list with a single customer', () => {
        const dateString = '2019-04-06T12:34:56.000Z';
        const customer = CustomerDataBuilder.aCustomer()
            .withId('123')
            .withName('Single Customer')
            .withCheckIn(new Date(dateString))
            .build()
        ;

        store.state.customerRepository.add(customer);

        const wrapper = shallowMount(Customers, {store, localVue});

        expect(wrapper.findAll('.gym-customers .gym-customer').length).eq(1);
        expect(
            wrapper.findAll('.gym-customers .gym-customer time').at(0).attributes('datetime')
        ).eq(dateString);
    });

    it('should not show the empty message when the list has customers', () => {
        store.state.customerRepository.add(CustomerDataBuilder.aCustomer().build());
        const wrapper = shallowMount(Customers, {store, localVue});

        expect(wrapper.findAll('.gym-empty').length).eq(0);
    });
});
