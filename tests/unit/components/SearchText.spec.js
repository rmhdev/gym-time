import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import SearchText from "@/components/SearchText";

describe('SearchText.vue', () => {

    it('renders a search form', () => {
        const wrapper = shallowMount(SearchText, {});

        expect(wrapper.findAll('form').length).eq(1);
        expect(wrapper.findAll('form input[type=text]').length).eq(1);
        expect(wrapper.findAll('form button[type=submit]').length).eq(1);
    });

    it('renders the input with custom props', () => {
        const wrapper = shallowMount(SearchText, {
            propsData: {
                name: 'search[custom]',
                label: 'Custom label',
            }
        });
        expect(
            wrapper.find('form input').element.getAttribute('name'),
            'Input has custom name'
        ).eq('search[custom]');

        expect(
            wrapper.find('form label').element.textContent,
            'Input has custom label'
        ).eq('Custom label');
    });

    it('renders names using the id if not defined', () => {
        const wrapper = shallowMount(SearchText, {
            propsData: {
                id: 'customID',
                label: 'My label'
            }
        });
        expect(
            wrapper.find('form input').element.getAttribute('name'),
            'It shows input with name based on id'
        ).eq('customID');
    });

    it('emits an event when a text is written', () => {
        const wrapper = shallowMount(SearchText, {
            propsData: {
                id: 'customID',
                name: 'search[custom]'
            }
        });
        wrapper.find('input[name="search[custom]"]').setValue("a");
        wrapper.find('input[name="search[custom]"]').trigger("keyup");
        expect(wrapper.emitted('search:by').length, 'First letter is written').eq(1);
        expect(wrapper.emitted('search:by')[0], 'Emitted event when first letter is written').to.eql(['a']);

        wrapper.find('input[name="search[custom]"]').setValue("bb");
        wrapper.find('input[name="search[custom]"]').trigger("keyup");
        expect(wrapper.emitted('search:by').length, 'Second letter is written').eq(2);
        expect(wrapper.emitted('search:by')[1], 'Emitted event when second letter is written').to.eql(['bb']);
    });

    it('emits an event when the form is submitted', () => {
        const wrapper = shallowMount(SearchText, {
            propsData: {
                id: 'customID',
                name: 'search[custom]'
            }
        });
        wrapper.find('input[name="search[custom]"]').setValue("hello");
        wrapper.find('form').trigger('submit');

        expect(wrapper.emitted('search:by').length, 'Event is emitted').eq(1);
        expect(wrapper.emitted('search:by')[0], 'Emitted event sends the correct value').to.eql(['hello']);
    });

    it('allows removing the text', () => {
        const wrapper = shallowMount(SearchText, {
            propsData: {
                id: 'customID',
                name: 'search[custom]'
            }
        });
        wrapper.find('input[name="search[custom]"]').setValue("bb");
        expect(
            wrapper.findAll('.gym-search-restart').length,
            'A button appears when the input has text'
        ).eq(1);

        wrapper.find('.gym-search-restart').trigger('click');
        expect(
            wrapper.find('input[name="search[custom]"]').element.value,
            'Clicking the button removes the text'
        ).eq('');
        expect(
            wrapper.findAll('.gym-search-restart').length,
            'The button disappears if there is no text'
        ).eq(0);
        expect(wrapper.emitted('search:by').length, 'Event is emitted').eq(1);
        expect(wrapper.emitted('search:by')[0], 'Emitted event sends the correct value').to.eql(['']);
    });

});
