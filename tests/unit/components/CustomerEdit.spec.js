import chai, {expect} from 'chai'
import {createLocalVue, shallowMount} from '@vue/test-utils'
import CustomerEdit from '@/components/CustomerEdit.vue'
import CustomerForm from "@/components/CustomerForm";
import {CustomerDataBuilder} from "../domain/model/customer/CustomerDataBuilder";
import Vuex from "vuex";
import storeConfig from "@/store/config";
import cloneDeep from "lodash.clonedeep";
import spies from "chai-spies";

const localVue = createLocalVue();
localVue.use(Vuex);

chai.use(spies);

describe('CustomerEdit.vue', () => {

    let localStoreConfig;
    let customer;
    let wrapper;

    beforeEach(() => {
        localStoreConfig = cloneDeep(storeConfig);
        localStoreConfig.actions.updateCustomer = chai.spy();
        customer = CustomerDataBuilder.aCustomer()
            .withId('123abc')
            .withName('Ms Customer')
            .withCheckIn('2019-03-19T12:00:00.000Z')
            .build();
        let store = new Vuex.Store(localStoreConfig);
        wrapper = shallowMount(CustomerEdit, {store, localVue, propsData : { customer: customer }});
    });

    it('passes the customer to the form', () => {
        expect(wrapper.find(CustomerForm).props('customer')).eq(customer);
    });

    it('dispatches "updateCustomer" when the form is submitted', () => {
        wrapper.find(CustomerForm).vm.$emit('submit:customer', { name: 'Lorem Ipsum', category: 'two' });

        expect(localStoreConfig.actions.updateCustomer).to.have.been.called.with(
            { id: '123abc', name: 'Lorem Ipsum', category: 'two' }
        );
    });

    it('emits an event with the new data of th customer', () => {
        wrapper.find(CustomerForm).vm.$emit('submit:customer', { name: 'Lorem Ipsum', category: 'two' });

        expect(
            wrapper.emitted('submit:customer')[0],
            'Emitted data from the form'
        ).to.eql([{ name: 'Lorem Ipsum', category: 'two' }]);
    });
});
