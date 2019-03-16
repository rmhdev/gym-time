import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Welcome from '@/components/Welcome.vue'

// Temporary fix for vuejs issue #9698
// See: https://github.com/vuejs/vue/issues/9698
global.performance = (undefined === window) ? null : window.performance;

describe('Welcome.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(Welcome, {
      propsData: { msg }
    });
    expect(wrapper.text()).to.include(msg)
  })
});
