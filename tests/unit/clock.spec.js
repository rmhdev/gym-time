import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Welcome from '@/components/Clock.vue'

describe('Clock.vue', () => {
  it('renders clock time when passed', () => {
    const date = new Date('2019-03-16T12:34:56');
    const wrapper = shallowMount(Welcome, {
      propsData: { date }
    });
    expect(wrapper.text()).eq('12:34 PM')
  })
});
