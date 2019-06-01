import { expect } from 'chai'
import {createLocalVue, shallowMount} from '@vue/test-utils'
import Welcome from '@/components/Clock.vue'
import TimeRelative from "@/components/TimeRelative";
import Vuex from "vuex";
import storeConfig from "@/store/config";
import cloneDeep from "lodash.clonedeep";

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Clock.vue', () => {

  let store;

  beforeEach(() => {
    let localConfig = cloneDeep(storeConfig);
    localConfig.datetime = '2019-03-19T12:00:00.000Z';
    store = new Vuex.Store(localConfig);
  });

  it('renders date and time components', () => {
    const wrapper = shallowMount(Welcome, {store, localVue});

    expect(wrapper.findAll(TimeRelative).length).eq(2);
  });

  it('renders the global date', () => {
    const wrapper = shallowMount(Welcome, {store, localVue});

    expect(wrapper.find('.gym-clock-date').props('mode'), 'clock date').eq('date');
  });

  it('renders the global time', () => {
    const wrapper = shallowMount(Welcome, {store, localVue});

    expect(wrapper.find('.gym-clock-time').props('mode'), 'clock date').eq('time');
  });
});
