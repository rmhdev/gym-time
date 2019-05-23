import {expect} from 'chai'
import {createLocalVue, shallowMount} from '@vue/test-utils'
import TimeRelative from '@/components/TimeRelative.vue'
import cloneDeep from "lodash.clonedeep";
import Vuex from "vuex";
const localVue = createLocalVue();
import storeConfig from "@/store/config";

localVue.use(Vuex);

describe('TimeRelative.vue', () => {

    it('renders the time in 24H format by default', () => {
        let localStoreConfig = cloneDeep(storeConfig);
        localStoreConfig.state.datetime = '2019-03-19 19:34:56';
        let store = new Vuex.Store(localStoreConfig);

        const wrapper = shallowMount(TimeRelative, { store, localVue });

        expect(wrapper.find('.gym-time-relative').text()).eq('19:34')
    });

    it('renders the time in AM/PM format when defined', () => {
        let localStoreConfig = cloneDeep(storeConfig);
        localStoreConfig.state.datetime = '2019-03-19 19:34:56';
        localStoreConfig.state.hour12 = true;
        let store = new Vuex.Store(localStoreConfig);
        const wrapper = shallowMount(TimeRelative, { store, localVue });

        expect(wrapper.find('.gym-time-relative').text()).eq('7:34 PM')
    });

    it('renders a custom time if defined', () => {
        let localStoreConfig = cloneDeep(storeConfig);
        localStoreConfig.state.datetime = '2019-03-19 19:34:56';
        let store = new Vuex.Store(localStoreConfig);
        const wrapper = shallowMount(TimeRelative, { store, localVue, propsData: {
            date: '2019-03-19 07:11:22'
        }});

        expect(wrapper.find('.gym-time-relative').text()).eq('07:11');
    });

});
