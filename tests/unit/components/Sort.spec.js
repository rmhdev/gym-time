import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Sort from "@/components/Sort";

describe('Sort.vue', () => {

    it('renders nothing when no fields are defined', () => {
        const wrapper = shallowMount(Sort, {});

        expect(wrapper.findAll('a').length).eq(0);
    });

    it('renders as many buttons as defined in fields', () => {
        const wrapper = shallowMount(Sort, {
            propsData: {
                fields: [ 'name', 'phone' ]
            }
        });

        expect(wrapper.findAll('a').length).eq(2);
    });

    it('selects the first element as active', () => {
        const wrapper = shallowMount(Sort, {
            propsData: {
                fields: [ 'name', 'phone' ]
            }
        });

        expect(wrapper.findAll('a[data-active=true]').length).eq(1);
        expect(wrapper.find('a[data-active=true]').attributes('data-value')).eq('name');
    });

    it('selects custom element as active', () => {
        const wrapper = shallowMount(Sort, {
            propsData: {
                fields: [ 'name', 'phone' ],
                selected: 'phone'
            }
        });

        expect(wrapper.findAll('a[data-active=true]').length).eq(1);
        expect(wrapper.find('a[data-active=true]').attributes('data-value')).eq('phone');
    });

    it('sets the default sorting order as asc', () => {
        const wrapper = shallowMount(Sort, {
            propsData: {
                fields: [ 'name', 'phone' ]
            }
        });

        expect(wrapper.find('a[data-active=true]').attributes('data-order')).eq('asc');
    });

    it('sets the defined sorting order', () => {
        const wrapper = shallowMount(Sort, {
            propsData: {
                fields: [ 'name', 'phone' ],
                order: 'desc'
            }
        });

        expect(wrapper.find('a[data-active=true]').attributes('data-order')).eq('desc');
    });

    it('changes the order when the active button is clicked', () => {
        const wrapper = shallowMount(Sort, {
            propsData: {
                fields: [ 'name', 'phone' ],
                selected: 'phone',
                order: 'desc'
            }
        });
        wrapper.find('a[data-active=true]').trigger('click');

        expect(wrapper.findAll('a[data-active=true]').length).eq(1);
        expect(wrapper.find('a[data-active=true]').attributes('data-value')).eq('phone');
        expect(wrapper.find('a[data-active=true]').attributes('data-order')).eq('asc');
    });

    it('sets the default order when non active button is clicked', () => {
        const wrapper = shallowMount(Sort, {
            propsData: {
                fields: [ 'name', 'phone' ],
                selected: 'phone',
                order: 'desc'
            }
        });
        wrapper.find('a[data-value="name"]').trigger('click');

        expect(wrapper.findAll('a[data-active=true]').length).eq(1);
        expect(wrapper.find('a[data-active=true]').attributes('data-value')).eq('name');
        expect(wrapper.find('a[data-active=true]').attributes('data-order')).eq('desc');
    });

    it('emits an event with sorting info when button is clicked', () => {
        const wrapper = shallowMount(Sort, {
            propsData: {
                fields: [ 'name', 'phone' ],
                selected: 'phone',
                order: 'asc'
            }
        });

        wrapper.find('a[data-value="phone"]').trigger('click');
        expect(wrapper.emitted('sort:by').length, 'Event is emitted').eq(1);
        expect(wrapper.emitted('sort:by')[0], 'Emitted event sends the correct value').to.eql(['phone', 'desc']);

        wrapper.find('a[data-value="phone"]').trigger('click');
        expect(wrapper.emitted('sort:by').length, 'Event is emitted').eq(2);
        expect(wrapper.emitted('sort:by')[1], 'Clicking the same button emits with changed order').to.eql(['phone', 'asc']);

        wrapper.find('a[data-value="name"]').trigger('click');
        expect(wrapper.emitted('sort:by').length, 'Event is emitted').eq(3);
        expect(wrapper.emitted('sort:by')[2], 'Clicking other button emits default order').to.eql(['name', 'asc']);
    });

    it('allows fields with value and name', () => {
        const wrapper = shallowMount(Sort, {
            propsData: {
                fields: [ { value: 'name', label: 'Name' }, { value: 'phone', label: 'Telephone' } ]
            }
        });

        expect(wrapper.find('a[data-value="name"]').text()).eq('Name');
        expect(wrapper.find('a[data-value="phone"]').text()).eq('Telephone');
    });

    it('humanizes labels based on the value when no label is available', () => {
        const wrapper = shallowMount(Sort, {
            propsData: {
                fields: [ 'created_at', 'someValue', 'Other-Value' ]
            }
        });

        expect(wrapper.find('a[data-value="created_at"]').text()).eq('Created at');
        expect(wrapper.find('a[data-value="someValue"]').text()).eq('Some Value');
        expect(wrapper.find('a[data-value="Other-Value"]').text()).eq('Other Value');
    });
});
