import {expect} from 'chai'
import {createLocalVue, shallowMount} from '@vue/test-utils'
import Checkout from '@/components/Checkout.vue'
import storeConfig from "@/store/config";
import {CustomerDataBuilder} from "./../domain/model/customer/CustomerDataBuilder";
import Vuex from "vuex";
import lodash from "lodash";
import chai from 'chai';
import spies from 'chai-spies';

const localVue = createLocalVue();
localVue.use(Vuex);
chai.use(spies);

describe('Checkout.vue', () => {

    let localStoreConfig;

    beforeEach(() => {
        localStoreConfig = lodash.cloneDeep(storeConfig);
        localStoreConfig.actions.toggleCheckoutCustomer = chai.spy();
        localStoreConfig.actions.initialiseCheckoutCustomers = chai.spy();
        localStoreConfig.actions.persistCheckoutCustomers = chai.spy();
    });

    it('shows a message when the checkout list is empty', () => {
        const store = new Vuex.Store(lodash.cloneDeep(localStoreConfig));
        const wrapper = shallowMount(Checkout, {store, localVue});

        expect(
            wrapper.findAll('.gym-checkout-customer').length,
            'No customers should be listed'
        ).eq(0);
        expect(
            wrapper.findAll('.gym-checkout-empty').length,
            'An alert message should be displayed'
        ).eq(1);
    });

    it('allows adding customers to the list', () => {
        localStoreConfig.state.customerRepository.add(
            CustomerDataBuilder.aCustomer()
                .withId('qwerty1')
                .withName('Mr. Checkout')
                .withCheckIn('2019-04-20T12:00:00.000Z')
                .build()
        );
        localStoreConfig.state.customerRepository.add(
            CustomerDataBuilder.aCustomer()
                .withId('other2')
                .withName('Ms. Session Finished')
                .withCheckIn('2019-04-20T12:00:00.000Z')
                .build()
        );
        localStoreConfig.state.checkoutCustomers.push({ id: 'qwerty1' });
        const store = new Vuex.Store(lodash.cloneDeep(localStoreConfig));
        const wrapper = shallowMount(Checkout, {store, localVue});

        expect(
            wrapper.findAll('.gym-checkout-customer').length,
            'A single customer should be available'
        ).eq(1);

        store.state.checkoutCustomers.push({ id: 'other2' });
        expect(
            wrapper.findAll('.gym-checkout-customer').length,
            'Two customers should be listed'
        ).eq(2);
    });

    it('allows removing customers from the list', () => {
        localStoreConfig.state.customerRepository.add(
            CustomerDataBuilder.aCustomer()
                .withId('cancel1')
                .withName('Ms. Cancel Checkout')
                .withCheckIn('2019-04-20T12:00:00.000Z')
                .build()
        );
        localStoreConfig.state.checkoutCustomers.push({ id: 'cancel1' });
        const store = new Vuex.Store(lodash.cloneDeep(localStoreConfig));
        const wrapper = shallowMount(Checkout, {store, localVue});
        wrapper.find(
            '#gym-customer-checkout-cancel1 .gym-customer-checkout-cancel'
        ).trigger('click');

        expect(
            localStoreConfig.actions.toggleCheckoutCustomer,
            'Action should be dispatched'
        ).to.have.been.called();
    });

    it('displays a cancel button that empties the list', () => {
        localStoreConfig.state.customerRepository.add(
            CustomerDataBuilder.aCustomer()
                .withId('cancel1')
                .withName('Ms. Cancel Checkout')
                .withCheckIn('2019-04-20T12:00:00.000Z')
                .build()
        );
        localStoreConfig.state.checkoutCustomers.push({ id: 'cancel1' });
        const store = new Vuex.Store(lodash.cloneDeep(localStoreConfig));
        const wrapper = shallowMount(Checkout, {store, localVue});
        wrapper.find(
            '.gym-checkout-cancel'
        ).trigger('click');

        expect(
            localStoreConfig.actions.initialiseCheckoutCustomers,
            'Action "cancel checkout" should be dispatched'
        ).to.have.been.called();
    });

    it('displays a confirm button that updates the status of the selected customers', () => {
        localStoreConfig.state.customerRepository.add(
            CustomerDataBuilder.aCustomer()
                .withId('confirm1')
                .withName('Ms. Confirm Checkout')
                .withCheckIn('2019-04-20T12:00:00.000Z')
                .build()
        );
        localStoreConfig.state.checkoutCustomers.push({ id: 'confirm1' });
        const store = new Vuex.Store(lodash.cloneDeep(localStoreConfig));
        const wrapper = shallowMount(Checkout, {store, localVue});
        wrapper.find(
            '.gym-checkout-confirm'
        ).trigger('click');

        expect(
            localStoreConfig.actions.persistCheckoutCustomers,
            'Action "confirm checkout" should be dispatched'
        ).to.have.been.called();
    });
});
