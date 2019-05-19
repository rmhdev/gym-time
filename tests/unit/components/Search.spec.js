import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Search from "@/components/Search";

describe('Search.vue', () => {

    it('renders a search form', () => {
        const wrapper = shallowMount(Search, {});

        expect(wrapper.findAll('form').length).eq(1);
        expect(wrapper.findAll('form button[type=submit]').length).eq(1);
    });

    it('renders the choices as radio buttons', () => {
        const wrapper = shallowMount(Search, {
            propsData: {
                name: 'search[custom]',
                choices: [
                    { value: 'one' },
                    { value: 'two' },
                    { value: 'three' },
                ]
            }
        });
        expect(
            wrapper.findAll('form input[name="search[custom]"]').length,
            'It shows all choices'
        ).eq(3);

        expect(
            wrapper.find('form input[name="search[custom]"]:checked').element.value,
            'By default, the first choice must be checked'
        ).eq('one');
    });

    it('renders names using the id if not defined', () => {
        const wrapper = shallowMount(Search, {
            propsData: {
                id: 'customID',
                choices: [
                    { value: 'one' },
                    { value: 'two' },
                    { value: 'three' },
                ]
            }
        });
        expect(
            wrapper.findAll('form input[name="customID"]').length,
            'It shows all choices and also a default one'
        ).eq(3);
    });

    it('renders an empty placeholder if defined', () => {
        const wrapper = shallowMount(Search, {
            propsData: {
                name: 'search[custom]',
                placeholder: 'all',
                choices: [
                    { value: 'one' },
                    { value: 'two' },
                    { value: 'three' },
                ]
            }
        });
        expect(
            wrapper.findAll('form input[name="search[custom]"]').length,
            'It shows all choices and also a default one'
        ).eq(4);

        expect(
            wrapper.find('form input[name="search[custom]"]:checked').element.value,
            'By default, the empty choice must be checked'
        ).eq('');
    });

    it('allows checking by default a choice', () => {
        const wrapper = shallowMount(Search, {
            propsData: {
                name: 'search[custom]',
                placeholder: 'all',
                choices: [
                    { value: 'one' },
                    { value: 'two' },
                    { value: 'three' },
                ],
                value: 'two'
            }
        });

        expect(
            wrapper.find('form input[name="search[custom]"]:checked').element.value,
            'A custom category must be checked'
        ).eq('two');
    });

    it('emits an event when a choice is checked', () => {
        const wrapper = shallowMount(Search, {
            propsData: {
                name: 'search[custom]',
                choices: [
                    { value: 'one' },
                    { value: 'two' },
                    { value: 'three' },
                ],
            }
        });
        const radio = wrapper.find('input[value="two"]');
        radio.element.selected = true;
        radio.trigger('change');

        expect(wrapper.emitted('search:by').length, 'Event is emitted').eq(1);
        expect(wrapper.emitted('search:by')[0], 'Emitted event sends the correct value').to.eql(['two']);
    });

    it('emits an event when the form is submitted', () => {
        const wrapper = shallowMount(Search, {
            propsData: {
                name: 'search[custom]',
                choices: [
                    { value: 'one' },
                    { value: 'two' },
                    { value: 'three' },
                ],
                value: 'three'
            }
        });
        wrapper.find('form').trigger('submit');

        expect(wrapper.emitted('search:by').length, 'Event is emitted').eq(1);
        expect(wrapper.emitted('search:by')[0], 'Emitted event sends the correct value').to.eql(['three']);
    });
});
