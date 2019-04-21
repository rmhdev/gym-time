import {expect} from 'chai'
import {createLocalVue, shallowMount} from '@vue/test-utils'
import Customers from '@/components/Customers.vue'
import Customer from '@/components/Customer.vue'
import {CustomerDataBuilder} from "./../domain/model/customer/CustomerDataBuilder";
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
        store.state.customerRepository.add(CustomerDataBuilder.aCustomer().build());
        const wrapper = shallowMount(Customers, {store, localVue});

        expect(wrapper.findAll('.gym-customer').length).eq(1);
    });

    it('should not show the empty message when the list has customers', () => {
        store.state.customerRepository.add(CustomerDataBuilder.aCustomer().build());
        const wrapper = shallowMount(Customers, {store, localVue});

        expect(wrapper.findAll('.gym-empty').length).eq(0);
    });

    it('re-emits the checkout event emitted by a customer', () => {
        store.state.customerRepository.add(CustomerDataBuilder.aCustomer().withId('987z').build());
        const wrapper = shallowMount(Customers, {store, localVue});
        wrapper.find(Customer).vm.$emit('checkout', { id: 'myId' });

        expect(wrapper.emitted('checkout').length, 'Checkout event from Customer must be re-emitted').eq(1);
        expect(wrapper.emitted('checkout')[0][0]['id'], 'Checkout event must emit the customer id').eq('myId');
    });
});
