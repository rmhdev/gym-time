import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import Customers from '@/components/Customers.vue'
import {CustomerDataBuilder} from "./domain/model/customer/CustomerDataBuilder";

describe('Customers.vue', () => {

    it('renders an empty list by default', () => {
        const wrapper = shallowMount(Customers, {});
        expect(wrapper.findAll('.customers').length).eq(1);
        expect(wrapper.findAll('.customers .customer').length).eq(0);
    });

    it('renders a list with a single customer', () => {
        const dateString = '2019-04-06T12:34:56.000Z';
        const customer = CustomerDataBuilder.aCustomer()
            .withId('123')
            .withName('Single Customer')
            .withCheckIn(new Date(dateString))
        ;
        const wrapper = shallowMount(Customers, {
            propsData: {
                customers: [customer]
            }
        });
        expect(wrapper.findAll('.customers .customer').length).eq(1);
        expect(
            wrapper.findAll('.customers .customer time').at(0).attributes('datetime')
        ).eq(dateString);
    });
});
