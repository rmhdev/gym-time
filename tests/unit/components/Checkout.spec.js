import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import Checkout from '@/components/Checkout.vue'
import {CustomerDataBuilder} from "./../domain/model/customer/CustomerDataBuilder";

describe('Checkout.vue', () => {

    it('renders a message with info about the user', () => {
        const customer = CustomerDataBuilder.aCustomer()
            .withName('Mr. Checkout')
            .withCheckIn('2019-04-20T12:00:00.000Z')
            .build();
        const wrapper = shallowMount(Checkout, {
            propsData: {
                customer: customer
            }
        });
        expect(wrapper.find('.gym-customer-name').text()).eq('Mr. Checkout');
        expect(wrapper.findAll('time').length).eq(1);
    });

    // it('displays a cancel button that closes the message', () => {
    //     const customer = CustomerDataBuilder.aCustomer()
    //         .withName('Mr. Checkout')
    //         .withCheckIn('2019-04-20T12:00:00.000Z')
    //         .build();
    //     const wrapper = shallowMount(Checkout, {
    //         propsData: {
    //             customer: customer
    //         }
    //     });
    //     expect(wrapper.find('.gym-checkout-alert').length).eq(1);
    //     wrapper.find('.gym-checkout-cancel').trigger('click');
    //     expect(wrapper.find('.gym-checkout-alert').length).eq(0);
    // })
});
