import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import Customer from '@/components/Customer.vue'
import {CustomerDataBuilder} from "../domain/model/customer/CustomerDataBuilder";
import {TimeFormatter} from "../../../src/domain/model/TimeFormatter";

describe('Customer.vue', () => {

    it('shows the name of the customer', () => {
        const customer = CustomerDataBuilder.aCustomer().withName('Ms Customer').build();
        const wrapper = shallowMount(Customer, {
            propsData: {
                customer: customer
            }
        });
        expect(wrapper.find('.gym-customer-name').text()).eq('Ms Customer');
    });

    it('shows the checkin time of the customer', () => {
        const customer = CustomerDataBuilder.aCustomer()
            .withName('Ms Customer')
            .withCheckIn('2019-03-19T12:00:00.000Z')
            .build();
        const wrapper = shallowMount(Customer, {
            propsData: {
                customer: customer
            }
        });
        const formatter = new TimeFormatter();

        expect(wrapper.find('time').attributes('datetime')).eq('2019-03-19T12:00:00.000Z');
        expect(wrapper.find('time').text()).eq(formatter.format(customer.checkIn()));
    });

    it('emits an event when a customer is clicked', () => {
        const customer = CustomerDataBuilder.aCustomer().withId('abc123').build();
        const wrapper = shallowMount(Customer, {
            propsData: {
                customer: customer
            }
        });
        wrapper.find('a').trigger('click');

        expect(wrapper.emitted('checkout').length, 'Checkout event must be emitted').eq(1);
        expect(wrapper.emitted('checkout')[0][0], 'Checkout event must emit the customer id').eq('abc123');
    });
});
