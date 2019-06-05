import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import Welcome from '@/components/Welcome.vue'
import Clock from "@/components/Clock";

describe('Welcome.vue', () => {
    it('renders props.msg when passed', () => {
        const msg = 'new message';
        const wrapper = shallowMount(Welcome, {
            propsData: {msg}
        });
        expect(wrapper.text()).to.include(msg)
    });

    it('renders a clock', () => {
        const msg = 'new message';
        const wrapper = shallowMount(Welcome, {
            propsData: {msg}
        });
        expect(wrapper.findAll(Clock).length).eq(1)
    });

    it('renders a button', () => {
        const wrapper = shallowMount(Welcome, {});

        expect(wrapper.findAll('a').length).eq(1);
    });

    it('emits an event when the button is clicked', () => {
        const wrapper = shallowMount(Welcome, {});
        wrapper.find('a').trigger('click');

        expect(wrapper.emitted('close').length, 'Event "close" is emitted').eq(1);
    });
});
