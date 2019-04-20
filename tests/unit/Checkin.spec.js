import {expect} from 'chai'
import {createLocalVue, shallowMount} from '@vue/test-utils'
import Vuex from 'vuex'
import Checkin from '@/components/Checkin.vue'
import { CustomerName } from "@/domain/model/customer/CustomerName";
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
        let store = new Vuex.Store(localStoreConfig);

        wrapper = shallowMount(Checkin, {store, localVue});
    });

    it('renders a form with a button', () => {
        expect(wrapper.findAll('form').length).eq(1);
        expect(wrapper.findAll('form input[type=text]').length).eq(1);
        expect(wrapper.findAll('form button[type=submit]').length).eq(1);
    });

    it('shows a error when trying submit an empty name', () => {
        wrapper.find('form').trigger('submit');
        expect(wrapper.find('input.is-invalid').exists(), 'Input must have class when invalid').eq(true);
        expect(wrapper.find('.invalid-feedback').isEmpty(), 'Invalid feedback message must have content').eq(false);
    });

    it('hides an error if user writes something', () => {
        wrapper.find('form').trigger('submit');
        expect(wrapper.find('input.is-invalid').exists(), 'Input must have class when invalid').eq(true);
        expect(wrapper.find('.invalid-feedback').isEmpty(), 'Invalid feedback message must have content').eq(false);

        wrapper.find("input").setValue("a");
        wrapper.find("input").trigger("keyup");
        expect(wrapper.find('input.is-invalid').exists(), 'Input does not have class when valid').eq(false);
        expect(wrapper.find('.invalid-feedback').exists(), 'No invalid feedback').eq(false);
    });

    it('shows a error when name is too long', () => {
        wrapper.find('input').setValue("a".repeat(CustomerName.maxLength()));
        wrapper.find('form').trigger("submit");

        expect(wrapper.find('input.is-invalid').exists(), 'Input must have class name is too long').eq(true);
        expect(wrapper.find('.invalid-feedback').isEmpty(), 'Invalid feedback message must have content').eq(false);
    });

    it('shows a error when name is too long', () => {
        wrapper.find('form').trigger('submit');
        wrapper.find('input').setValue("a".repeat(CustomerName.maxLength()));
        expect(wrapper.find('input.is-invalid').exists(), 'Input must have class when invalid').eq(true);
        expect(wrapper.find('.invalid-feedback').isEmpty(), 'Invalid feedback message must have content').eq(false);

        wrapper.find('input').setValue("a".repeat(CustomerName.maxLength() - 1));
        wrapper.find("input").trigger("keyup");
        expect(wrapper.find('input.is-invalid').exists(), 'Input does not have class when valid').eq(false);
        expect(wrapper.find('.invalid-feedback').exists(), 'No invalid feedback').eq(false);
    });

    it('shows a success message when name is added correctly', () => {
        wrapper.find('input').setValue('Lorem Ipsum');
        wrapper.find("form").trigger("submit");

        expect(wrapper.find('form').exists(), 'Form disappears when adding a correct customer').eq(false);
        expect(wrapper.find('.gym-customer-added').exists(), 'Checkin has feedback message when success').eq(true);
    });

    it('dispatches "createAndAddNewCustomer" when clicking on button', () => {
        wrapper.find('input').setValue('Lorem Ipsum');
        wrapper.find("form").trigger("submit");

        expect(localStoreConfig.actions.createAndAddNewCustomer).to.have.been.called();
    })
});
