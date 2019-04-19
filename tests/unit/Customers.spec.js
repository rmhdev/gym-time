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

    it('renders an empty list by default', () => {
        const wrapper = shallowMount(Customers, {store, localVue});
        expect(wrapper.findAll('.customers').length).eq(1);
        expect(wrapper.findAll('.customers .customer').length).eq(0);
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

        expect(wrapper.findAll('.customers .customer').length).eq(1);
        expect(
            wrapper.findAll('.customers .customer time').at(0).attributes('datetime')
        ).eq(dateString);
    });
});
