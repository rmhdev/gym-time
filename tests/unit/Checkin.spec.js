import {expect} from 'chai'
import {createLocalVue, shallowMount} from '@vue/test-utils'
import Vuex from 'vuex'
import Checkin from '@/components/Checkin.vue'
import {CustomerName} from "../../src/domain/model/customer/CustomerName";
import chai from 'chai';
import spies from 'chai-spies';

const localVue = createLocalVue();

localVue.use(Vuex);

chai.use(spies);

describe('Checkin.vue', () => {

    let actions;
    let store;

    beforeEach(() => {
        actions = {
            createAndAddNewCustomer: chai.spy()
        };
        store = new Vuex.Store({
            actions
        });
    });

    it('renders a form with a button', () => {
        const wrapper = shallowMount(Checkin, {});
        expect(wrapper.findAll('form').length).eq(1);
        expect(wrapper.findAll('form input[type=text]').length).eq(1);
        expect(wrapper.findAll('form button[type=submit]').length).eq(1);
    });

    it('shows a error when trying submit an empty name', () => {
        const wrapper = shallowMount(Checkin);
        wrapper.find('form').trigger('submit');
        expect(wrapper.find('input.is-invalid').exists(), 'Input must have class when invalid').eq(true);
        expect(wrapper.find('.invalid-feedback').isEmpty(), 'Invalid feedback message must have content').eq(false);

        wrapper.find("input").setValue("a");
        wrapper.find("input").trigger("submit");
        expect(wrapper.find('input.is-invalid').exists(), 'Input does not have class when valid').eq(false);
        expect(wrapper.find('.invalid-feedback').text(), 'Invalid feedback message must be empty').eq('');
    });

    it('hides an error if user writes something', () => {
        const wrapper = shallowMount(Checkin);
        wrapper.find('form').trigger('submit');
        expect(wrapper.find('input.is-invalid').exists(), 'Input must have class when invalid').eq(true);
        expect(wrapper.find('.invalid-feedback').isEmpty(), 'Invalid feedback message must have content').eq(false);

        wrapper.find("input").setValue("a");
        wrapper.find("input").trigger("keyup");
        expect(wrapper.find('input.is-invalid').exists(), 'Input does not have class when valid').eq(false);
        expect(wrapper.find('.invalid-feedback').exists(), 'No invalid feedback').eq(false);
    });

    it('shows a error when name is too long', () => {
        const wrapper = shallowMount(Checkin);
        wrapper.find('input').setValue("a".repeat(CustomerName.maxLength()));
        wrapper.find('form').trigger("submit");

        expect(wrapper.find('input.is-invalid').exists(), 'Input must have class name is too long').eq(true);
        expect(wrapper.find('.invalid-feedback').isEmpty(), 'Invalid feedback message must have content').eq(false);
    });

    it('shows a error when name is too long', () => {
        const wrapper = shallowMount(Checkin);
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
        const wrapper = shallowMount(Checkin);
        expect(wrapper.find('input.is-valid').exists(), 'Input has no feedback class by default').eq(false);

        wrapper.find('input').setValue('Lorem Ipsum');
        wrapper.find("form").trigger("submit");

        expect(wrapper.find('input.is-valid').exists(), 'Input has feedback class when valid').eq(true);
    });

    //it('emits new customer event when correct name is submitted', () => {
    //    const wrapper = shallowMount(Checkin);
    //    wrapper.find('input').setValue('Lorem Ipsum');
    //    wrapper.find("form").trigger("submit");
    //
    //    expect(wrapper.emitted('new-customer-created').length).eq(1);
    //    expect(wrapper.emitted('new-customer-created')[0][0].name).equal('Lorem Ipsum');
    //});

    it('dispatches "createAndAddNewCustomer" when clicking on button', () => {
        const wrapper = shallowMount(Checkin, { store, localVue });
        wrapper.find('input').setValue('Lorem Ipsum');
        wrapper.find("form").trigger("submit");

        expect(actions.createAndAddNewCustomer).to.have.been.called();
    })
});
