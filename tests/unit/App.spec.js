import {expect} from 'chai'
import {createLocalVue, shallowMount} from '@vue/test-utils'
import App from '@/App.vue'
import storeConfig from "@/store/config";
import {CustomerDataBuilder} from "./domain/model/customer/CustomerDataBuilder";
import Checkout from "@/components/Checkout.vue";
import Vuex from "vuex";
import cloneDeep from "lodash.clonedeep";

const localVue = createLocalVue();
localVue.use(Vuex);

describe('App.vue', () => {

    let store;

    beforeEach(() => {
        store = new Vuex.Store(cloneDeep(storeConfig));
    });

    it('shows a message for a customer ready to checkout', () => {
        const customer = CustomerDataBuilder.aCustomer().withId('qwerty1').build();
        store.state.customerRepository.add(customer);
        store.state.checkoutCustomers.push({ id: 'qwerty1' });
        const wrapper = shallowMount(App, {store, localVue});

        expect(
            wrapper.findAll(Checkout).length,
            'The Checkout component should be visible'
        ).eq(1);
    });
});
