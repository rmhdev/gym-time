import {expect} from 'chai'
import CheckinSuccess from '@/components/CheckinSuccess.vue'
import {shallowMount} from "@vue/test-utils";

describe('CheckinSuccess.vue', () => {

    it('renders a message', () => {
        const wrapper = shallowMount(CheckinSuccess, {});

        expect(wrapper.findAll('.gym-customer-added').length).eq(1);
    });

    it('emits an event when the button is clicked', () => {
        const wrapper = shallowMount(CheckinSuccess, {});
        wrapper.find('a').trigger('click');

        expect(wrapper.emitted('close').length).eq(1);
    });

    it('focuses the button', () => {
        const wrapper = shallowMount(CheckinSuccess, {});

        expect(wrapper.findAll('a:focus').length).eq(1);
    });
});
