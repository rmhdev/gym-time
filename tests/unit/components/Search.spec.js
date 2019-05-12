import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Search from "@/components/Search";
import { CustomerCategory } from "@/domain/model/customer/CustomerCategory";

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
            'It shows 3 categories and also a default one'
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
                checked: 'two'
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
});
