import {expect} from 'chai'
import {createLocalVue, shallowMount} from '@vue/test-utils'
import Vuex from 'vuex'
import CustomerForm from '@/components/CustomerForm.vue'
import { CustomerName } from "@/domain/model/customer/CustomerName";
import storeConfig from "@/store/config";
import cloneDeep from 'lodash.clonedeep'

const localVue = createLocalVue();

localVue.use(Vuex);

describe('CustomerForm.vue', () => {

    let localStoreConfig;
    let wrapper;

    beforeEach(() => {
        localStoreConfig = cloneDeep(storeConfig);
        localStoreConfig.state.categories = ['one', 'two', 'three'];
        let store = new Vuex.Store(localStoreConfig);

        wrapper = shallowMount(CustomerForm, {store, localVue});
    });

    it('renders a form with a button', () => {
        expect(wrapper.findAll('form input[name="customer[name]"]').length).eq(1);
        expect(wrapper.findAll('form input[name="customer[name]"]:focus').length, 'Focused by default').eq(1);
        expect(wrapper.findAll('form select[name="customer[category]"]').length).eq(1);
        expect(wrapper.findAll('form select[name="customer[category]"] option').length).eq(3);
        expect(wrapper.findAll('form button[type=submit]').length).eq(1);
    });

    it('should have the first category selected by default', () => {
        expect(wrapper.find('form select[name="customer[category]"] option:checked').element.value).eq('one');
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

        wrapper.find('input[name="customer[name]"]').setValue("a");
        wrapper.find('input[name="customer[name]"]').trigger("keyup");
        expect(wrapper.find('input.is-invalid').exists(), 'Input does not have class when valid').eq(false);
        expect(wrapper.find('.invalid-feedback').exists(), 'No invalid feedback').eq(false);
    });

    it('shows a error when name is too long', () => {
        wrapper.find('input[name="customer[name]"]').setValue("a".repeat(CustomerName.maxLength()));
        wrapper.find('form').trigger("submit");

        expect(wrapper.find('input.is-invalid').exists(), 'Input must have class name is too long').eq(true);
        expect(wrapper.find('.invalid-feedback').isEmpty(), 'Invalid feedback message must have content').eq(false);
    });

    it('shows a error when name is too long', () => {
        wrapper.find('form').trigger('submit');
        wrapper.find('input[name="customer[name]"]').setValue("a".repeat(CustomerName.maxLength()));
        expect(wrapper.find('input.is-invalid').exists(), 'Input must have class when invalid').eq(true);
        expect(wrapper.find('.invalid-feedback').isEmpty(), 'Invalid feedback message must have content').eq(false);

        wrapper.find('input[name="customer[name]"]').setValue("a".repeat(CustomerName.maxLength() - 1));
        wrapper.find('input[name="customer[name]"]').trigger("keyup");
        expect(wrapper.find('input.is-invalid').exists(), 'Input does not have class when valid').eq(false);
        expect(wrapper.find('.invalid-feedback').exists(), 'No invalid feedback').eq(false);
    });

    it('emits an event with the customer data', () => {
        wrapper.find('input[name="customer[name]"]').setValue('Lorem Ipsum');
        const categoryField = wrapper.find('option[value="two"]');
        categoryField.element.selected = true;
        categoryField.trigger('change');
        wrapper.find("form").trigger("submit");

        expect(
            wrapper.emitted('submit:customer').length, 'Event is emitted'
        ).eq(1);
        expect(
            wrapper.emitted('submit:customer')[0], 'Emitted event sends the correct values'
        ).to.eql(['Lorem Ipsum', 'two']);
    });
});
