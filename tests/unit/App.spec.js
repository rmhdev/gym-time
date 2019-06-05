import {expect} from 'chai'
import {createLocalVue, shallowMount} from '@vue/test-utils'
import App from '@/App.vue'
import Checkout from "@/components/Checkout.vue";
import Customers from "@/components/Customers";
import Checkin from "@/components/Checkin";
import Welcome from "@/components/Welcome";
import storeConfig from "@/store/config";
import {CustomerDataBuilder} from "./domain/model/customer/CustomerDataBuilder";
import Vuex from "vuex";
import cloneDeep from "lodash.clonedeep";

const localVue = createLocalVue();
localVue.use(Vuex);

describe('App.vue', () => {

    it('shows a welcome message', () => {
        let store = new Vuex.Store(cloneDeep(storeConfig));
        const customer = CustomerDataBuilder.aCustomer().withId('qwerty1').build();
        store.state.customerRepository.add(customer);
        store.state.checkoutCustomers.push({ id: 'qwerty1' });
        const wrapper = shallowMount(App, {store, localVue});

        expect(
            wrapper.findAll(Welcome).length,
            'The Checkout component should be visible'
        ).eq(1);

        expect(
            wrapper.findAll(Checkout).length,
            'The Checkout component should not be visible'
        ).eq(0);

        expect(
            wrapper.findAll(Checkin).length,
            'The Checkin component should not be visible'
        ).eq(0);

        expect(
            wrapper.findAll(Customers).length,
            'The Customers component should not be visible'
        ).eq(0);
    });

    it('shows a message for a customer ready to checkout', () => {
        let store = new Vuex.Store(cloneDeep(storeConfig));
        const customer = CustomerDataBuilder.aCustomer().withId('qwerty1').build();
        store.state.customerRepository.add(customer);
        store.state.checkoutCustomers.push({ id: 'qwerty1' });
        const wrapper = shallowMount(App, {store, localVue});

        wrapper.find(Welcome).vm.$emit('close');

        expect(
            wrapper.findAll(Welcome).length,
            'The Welcome component should not be visible'
        ).eq(0);

        expect(
            wrapper.findAll(Checkout).length,
            'The Checkout component should be visible'
        ).eq(1);

        expect(
            wrapper.findAll(Checkin).length,
            'The Checkin component should not be visible'
        ).eq(0);

        expect(
            wrapper.findAll(Customers).length,
            'The Customers component should be visible'
        ).eq(1);
    });
});
