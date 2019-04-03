import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Checkin from '@/components/Checkin.vue'
import {CustomerName} from "../../src/domain/model/customer/CustomerName";

describe('Checkin.vue', () => {
  it('renders a form with a button', () => {
    const wrapper = shallowMount(Checkin, {});
    expect(wrapper.findAll('form').length).eq(1);
    expect(wrapper.findAll('form input[type=text]').length).eq(1);
    expect(wrapper.findAll('form button[type=submit]').length).eq(1);
  });
  it('shows a error when trying submit an empty name', () => {
    const wrapper = shallowMount(Checkin, {
      data () {
        return {
          name: '',
        }
      }
    });
    wrapper.find('form').trigger('submit');
    expect(wrapper.find('input.is-invalid').exists(), 'Input must have class when invalid').eq(true);
    expect(wrapper.find('.invalid-feedback').isEmpty(), 'Invalid feedback message must have content').eq(false);

    wrapper.find("input").setValue("a");
    wrapper.find("input").trigger("submit");
    expect(wrapper.find('input.is-invalid').exists(), 'Input does not have class when valid').eq(false);
    expect(wrapper.find('.invalid-feedback').text(), 'Invalid feedback message must be empty').eq('');
  });

  it('hides an error if user writes something', () => {
    const wrapper = shallowMount(Checkin, {
      data () {
        return {
          name: '',
        }
      }
    });
    wrapper.find('form').trigger('submit');
    expect(wrapper.find('input.is-invalid').exists(), 'Input must have class when invalid').eq(true);
    expect(wrapper.find('.invalid-feedback').isEmpty(), 'Invalid feedback message must have content').eq(false);

    wrapper.find("input").setValue("a");
    wrapper.find("input").trigger("keyup");
    expect(wrapper.find('input.is-invalid').exists(), 'Input does not have class when valid').eq(false);
    expect(wrapper.find('.invalid-feedback').text(), 'Invalid feedback message must be empty').eq('');
  });

  it('shows a error when name is too long', () => {
    const wrapper = shallowMount(Checkin);
    wrapper.find('input').setValue("a".repeat(CustomerName.maxLength()));
    wrapper.find('form').trigger("submit");

    expect(wrapper.find('input.is-invalid').exists(), 'Input must have class name is too long').eq(true);
    expect(wrapper.find('.invalid-feedback').isEmpty(), 'Invalid feedback message must have content').eq(false);
  });
  it('shows a error when name is too long', () => {
    const wrapper = shallowMount(Checkin);
    wrapper.find('form').trigger('submit');
    wrapper.find('input').setValue("a".repeat(CustomerName.maxLength()));
    expect(wrapper.find('input.is-invalid').exists(), 'Input must have class when invalid').eq(true);
    expect(wrapper.find('.invalid-feedback').isEmpty(), 'Invalid feedback message must have content').eq(false);

    wrapper.find('input').setValue("a".repeat(CustomerName.maxLength() - 1));
    wrapper.find("input").trigger("keyup");
    expect(wrapper.find('input.is-invalid').exists(), 'Input does not have class when valid').eq(false);
    expect(wrapper.find('.invalid-feedback').text(), 'Invalid feedback message must be empty').eq('');
  });

});
