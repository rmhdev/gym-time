import {expect} from 'chai'
import {createLocalVue, shallowMount} from '@vue/test-utils'
import Vuex from 'vuex'
import Checkin from '@/components/Checkin.vue'
import CustomerForm from "@/components/CustomerForm";
import storeConfig from "@/store/config";
import cloneDeep from 'lodash.clonedeep'
import chai from 'chai';
import spies from 'chai-spies';

const localVue = createLocalVue();

localVue.use(Vuex);

chai.use(spies);

describe('Checkin.vue', () => {

    let localStoreConfig;
    let wrapper;

    beforeEach(() => {
        localStoreConfig = cloneDeep(storeConfig);
        localStoreConfig.actions.createAndAddNewCustomer = chai.spy();
        localStoreConfig.state.categories = ['one', 'two', 'three'];
        let store = new Vuex.Store(localStoreConfig);

        wrapper = shallowMount(Checkin, {store, localVue});
    });

    it('renders a customer form', () => {
        expect(wrapper.findAll(CustomerForm).length).eq(1);
    });

    it('shows a success message when name is added correctly', () => {
        wrapper.find(CustomerForm).vm.$emit('submit:customer', ['My Name', 'two']);

        expect(wrapper.find(CustomerForm).exists(), 'Form disappears when adding a correct customer').eq(false);
        expect(wrapper.find('.gym-checkin-success').exists(), 'Checkin has feedback message when success').eq(true);
    });

    it('dispatches "createAndAddNewCustomer" when clicking on button', () => {
        wrapper.find(CustomerForm).vm.$emit('submit:customer', 'Lorem Ipsum', 'two');

        expect(localStoreConfig.actions.createAndAddNewCustomer).to.have.been.called.with(
            { name: 'Lorem Ipsum', category: 'two' }
        );
    });

    it('shows the form after closing the feedback message', () => {
        wrapper.find(CustomerForm).vm.$emit('submit:customer', 'My Name', 'two');
        wrapper.find('.gym-checkin-success').vm.$emit('close');

        expect(wrapper.find(CustomerForm).exists(), 'Form appears again').eq(true);
        expect(wrapper.find(CustomerForm).props('customer'), 'empty customer data').eq(null);
    });
});
