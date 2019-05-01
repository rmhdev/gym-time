import {expect} from 'chai'
import {createLocalVue, shallowMount} from '@vue/test-utils'
import Customer from '@/components/Customer.vue'
import {CustomerDataBuilder} from "../domain/model/customer/CustomerDataBuilder";
import {TimeFormatter} from "@/domain/model/TimeFormatter";
import Vuex from "vuex";
import storeConfig from "@/store/config";
import cloneDeep from "lodash.clonedeep";

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Customer.vue', () => {

    let store;
    let customer;

    beforeEach(() => {
        customer = CustomerDataBuilder.aCustomer()
            .withName('Ms Customer')
            .withCheckIn('2019-03-19T12:00:00.000Z')
            .build();
        store = new Vuex.Store(cloneDeep(storeConfig));
    });

    it('shows the name of the customer', () => {
        const wrapper = shallowMount(Customer, {store, localVue, propsData : { customer: customer }});
        expect(wrapper.find('.gym-customer-name').text()).eq('Ms Customer');
    });

    it('shows the checkin time of the customer', () => {
        const wrapper = shallowMount(Customer, {store, localVue, propsData : { customer: customer }});
        const formatter = new TimeFormatter();

        expect(wrapper.find('time').attributes('datetime')).eq('2019-03-19T12:00:00.000Z');
        expect(wrapper.find('time').text()).eq(formatter.format(customer.checkIn()));
    });

    it('marks the customer when clicked', () => {
        const wrapper = shallowMount(Customer, {store, localVue, propsData : { customer: customer }});

        // TODO: continue here
        expect(
            wrapper.find('.gym-customer-selected',
            'By default the customer should not be selected'
        ).length).eq(0);

        wrapper.find('a').trigger('click');
        expect(
            wrapper.find('.gym-customer-selected',
            'The customer should be marked as selected'
        ).length).eq(1);
    });
});
