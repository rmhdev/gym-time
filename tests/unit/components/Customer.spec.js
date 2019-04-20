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
});
