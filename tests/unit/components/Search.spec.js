import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Search from "@/components/Search";
import { CustomerCategory } from "@/domain/model/customer/CustomerCategory";
import {CustomerStatus} from "../../../src/domain/model/customer/CustomerStatus";

describe('Search.vue', () => {

    it('renders a search form', () => {
        const wrapper = shallowMount(Search, {});

        expect(wrapper.findAll('form').length).eq(1);
        expect(wrapper.findAll('form button[type=submit]').length).eq(1);
    });

    it('renders the categories as radio buttons', () => {
        const wrapper = shallowMount(Search, {
            propsData: {
                categories: [
                    new CustomerCategory('one'),
                    new CustomerCategory('two'),
                    new CustomerCategory('three'),
                ]
            }
        });
        expect(
            wrapper.findAll('form input[name="search[category]"]').length,
            'It shows all categories and also a default one'
        ).eq(4);

        expect(
            wrapper.find('form input[name="search[category]"]:checked').element.value,
            'By default, the empty category must be checked'
        ).eq('');
    });
    it('allows checking by default a category', () => {
        const wrapper = shallowMount(Search, {
            propsData: {
                categories: [
                    new CustomerCategory('one'),
                    new CustomerCategory('two'),
                    new CustomerCategory('three'),
                ],
                category: 'two'
            }
        });

        expect(
            wrapper.find('form input[name="search[category]"]:checked').element.value,
            'A custom category must be checked'
        ).eq('two');
    });

    it('emits an event when a category is checked', () => {
        const wrapper = shallowMount(Search, {
            propsData: {
                categories: [new CustomerCategory('one')]
            }
        });
        const radio = wrapper.find('input[value="one"]');
        radio.element.selected = true;
        radio.trigger('change');

        expect(wrapper.emitted('search:category').length, 'Event is emitted').eq(1);
        expect(wrapper.emitted('search:category')[0], 'Emitted event sends the correct value').to.eql(['one']);
    });
    it('renders the statuses as radio buttons', () => {
        const wrapper = shallowMount(Search, {
            propsData: {
                statuses: [
                    new CustomerStatus('alpha'),
                    new CustomerStatus('beta'),
                    new CustomerStatus('phi'),
                ]
            }
        });
        expect(
            wrapper.findAll('form input[name="search[status]"]').length,
            'It shows all statuses and also a default one'
        ).eq(4);

        expect(
            wrapper.find('form input[name="search[status]"]:checked').element.value,
            'By default, the first status must be checked'
        ).eq('alpha');
    });

    it('allows checking by default a status', () => {
        const wrapper = shallowMount(Search, {
            propsData: {
                statuses: [
                    new CustomerCategory('one'),
                    new CustomerCategory('two'),
                    new CustomerCategory('three'),
                ],
                status: 'three'
            }
        });

        expect(
            wrapper.find('form input[name="search[status]"]:checked').element.value,
            'A custom status must be checked'
        ).eq('three');
    });
});
