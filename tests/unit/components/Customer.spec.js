import {expect} from 'chai'
import {createLocalVue, shallowMount} from '@vue/test-utils'
import Customer from '@/components/Customer.vue'
import TimeRelative from "@/components/TimeRelative";
import {CustomerDataBuilder} from "../domain/model/customer/CustomerDataBuilder";
import Vuex from "vuex";
import storeConfig from "@/store/config";
import lodash from "lodash";
import CustomerForm from "@/components/CustomerForm";

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
        store = new Vuex.Store(lodash.cloneDeep(storeConfig));
    });

    it('shows the name of the customer', () => {
        const wrapper = shallowMount(Customer, {store, localVue, propsData : { customer: customer }});
        expect(wrapper.find('.gym-customer-name').text()).eq('Ms Customer');
    });

    it('shows the category of the customer', () => {
        const wrapper = shallowMount(Customer, {store, localVue, propsData : { customer: customer }});
        expect(wrapper.find('.gym-customer-category').text()).eq(customer.category);
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
        const checkbox = wrapper.find('input[type="checkbox"]');

        expect(
            checkbox.attributes('checked'),
            'By default the customer should not be selected'
        ).equal(undefined);

        expect(
            checkbox.classes('checked'),
            'The customer name should not have the checked class'
        ).equal(false);

        checkbox.setChecked();
        expect(
            wrapper.classes('gym-customer-selected'),
            'The customer should have the checked class'
        ).equal(true);
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

        wrapper.find('input[type="checkbox"]').setChecked(true);
        expect(
            wrapper.findAll('.gym-customer-selected').length,
            'The customer should not be marked as selected'
        ).eq(0);
    });

    it('toggles the edit form when clicking open/close button', () => {
        const wrapper = shallowMount(Customer, {
            store,
            localVue,
            propsData : {
                customer: customer,
            }
        });
        wrapper.find('a.gym-customer-edit').trigger('click');

        expect(
            wrapper.findAll(CustomerForm).length,
            'Customer edit component'
        ).eq(1);
        expect(
            wrapper.findAll('.gym-customer-selectable').length,
            'Customer cannot be selected when is being edited'
        ).eq(0);

        wrapper.find('a.gym-customer-edit-close').trigger('click');
        expect(
            wrapper.findAll(CustomerForm).length,
            'Customer edit component should be hidden'
        ).eq(0);
        expect(
            wrapper.findAll('.gym-customer-selectable').length,
            'Customer can be selected when edit form is closed'
        ).eq(1);
    });

    it('closes the form and displays the new data after submitting it', () => {
        const wrapper = shallowMount(Customer, {
            store,
            localVue,
            propsData : {
                customer: customer,
            }
        });
        wrapper.find('a.gym-customer-edit').trigger('click');
        wrapper.find(CustomerForm).vm.$emit('submit:customer', { name: 'New Name', category: 'two'} );

        expect(
            wrapper.find(CustomerForm).exists(),
            'Form should be hidden'
        ).eq(false);

        expect(
            wrapper.find('.gym-customer-name').text(),
            'Display new data from updated customer'
        ).eq('New Name');
        expect(
            wrapper.find('.gym-customer-category').attributes('data-category'),
            'Display new category'
        ).eq('two');
    });

    // TODO: user should not be edited when selected
    // TODO: user should not be selected when editing
});
