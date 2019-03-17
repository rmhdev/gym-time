import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Checkin from '@/components/Checkin.vue'

describe('Checkin.vue', () => {
  it('renders a button', () => {
    const wrapper = shallowMount(Checkin, {});
    expect(wrapper.contains('a')).eq(true);
  })
});
