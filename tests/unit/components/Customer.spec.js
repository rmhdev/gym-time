import {expect} from 'chai'
import {createLocalVue, shallowMount} from '@vue/test-utils'
import Customer from '@/components/Customer.vue'
import TimeRelative from "@/components/TimeRelative";
import {CustomerDataBuilder} from "../domain/model/customer/CustomerDataBuilder";
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

    it('shows the category of the customer', () => {
        const wrapper = shallowMount(Customer, {store, localVue, propsData : { customer: customer }});
        expect(wrapper.find('.gym-customer-category').text()).eq(customer.category.value);
    });

    it('shows the checkin time of the customer', () => {
        const wrapper = shallowMount(Customer, {store, localVue, propsData : { customer: customer }});

        expect(wrapper.find(TimeRelative).props('from')).eq(customer.checkIn().toISOString());
        expect(wrapper.find(TimeRelative).props('mode')).eq('from');
    });

    it('shows the checkin time and the duration of the stay when the customer has checked out', () => {
        const checkin = '2019-03-19T12:00:00.000Z';
        const checkout = '2019-03-19T12:35:45.000Z';
        const checkoutCustomer = CustomerDataBuilder.aCustomer()
            .withName('Ms Customer')
            .withCheckIn(checkin)
            .withCheckOut(checkout)
            .build()
        ;
        const wrapper = shallowMount(Customer, {store, localVue, propsData : { customer: checkoutCustomer }});

        expect(wrapper.findAll(TimeRelative).length).eq(2);
        expect(wrapper.find('.gym-customer-checkin').props('from'), 'checkin date').eq(checkin);
        expect(wrapper.find('.gym-customer-checkin').props('mode'), 'checkin date, show date').eq('from');
        expect(wrapper.find('.gym-customer-duration').props('to'), 'checkout date').eq(checkout);
        expect(wrapper.find('.gym-customer-duration').props('mode'), 'checkout date, show duration').eq('duration');
    });

    it('marks the customer when clicked', () => {
        const wrapper = shallowMount(Customer, {store, localVue, propsData : { customer: customer }});

        expect(
            wrapper.findAll('.gym-customer-selected').length,
            'By default the customer should not be selected'
        ).eq(0);

        wrapper.find('a').trigger('click');
        expect(
            wrapper.findAll('.gym-customer-selected').length,
            'The customer should be marked as selected'
        ).eq(1);
    });

    it('allows marking if status is disabled', () => {
        const wrapper = shallowMount(Customer, {
            store,
            localVue,
            propsData : {
                customer: customer,
                disabled: true
            }
        });

        wrapper.find('a').trigger('click');
        expect(
            wrapper.findAll('.gym-customer-selected').length,
            'The customer should not be marked as selected'
        ).eq(0);
    });
});
