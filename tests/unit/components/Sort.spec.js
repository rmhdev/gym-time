import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Sort from "@/components/Sort";

describe('Sort.vue', () => {

    it('renders a sort link', () => {
        const wrapper = shallowMount(Sort, {});

        expect(wrapper.find('a').classes()).to.not.contain(['asc', 'desc']);
        expect(wrapper.find('a').text()).eq('?');
    });

    it('renders a sort link with a custom label', () => {
        const wrapper = shallowMount(Sort, {
            propsData: {
                label: 'hello'
            }
        });

        expect(wrapper.find('a').text()).eq('hello');
    });

    it('toggles default classes when clicking on it', () => {
        const wrapper = shallowMount(Sort, {});

        wrapper.find('a').trigger('click');
        expect(wrapper.find('a').classes()).to.contain('asc');

        wrapper.find('a').trigger('click');
        expect(wrapper.find('a').classes()).to.contain('desc');
    });

    it('renders the sort link with a predefined order', () => {
        const wrapper = shallowMount(Sort, {
            propsData: {
                order: 'desc'
            }
        });

        expect(wrapper.find('a').classes()).to.contain('desc');
    });

    it('emits an event when clicked', () => {
        const wrapper = shallowMount(Sort, {
            propsData: {
                order: 'asc'
            }
        });

        wrapper.find('a').trigger('click');
        expect(wrapper.emitted('sort:order').length, 'Event is emitted').eq(1);
        expect(wrapper.emitted('sort:order')[0], 'Emitted event sends the correct value').to.eql(['desc']);
    });
});
