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

    it('renders a duration', () => {
        let localStoreConfig = cloneDeep(storeConfig);
        localStoreConfig.state.datetime = '2019-03-19 12:00:00';
        let store = new Vuex.Store(localStoreConfig);
        const wrapper = shallowMount(TimeRelative, { store, localVue, propsData: {
                date: '2019-03-19 12:30:45',
                mode: 'duration'
            }});

        expect(wrapper.find('.gym-time-relative').text()).eq('30m 45s');
    });

    it('renders time related attributes', () => {
        const datetime = '2019-03-19T12:00:00.000Z';
        let localStoreConfig = cloneDeep(storeConfig);
        localStoreConfig.state.datetime = datetime;
        let store = new Vuex.Store(localStoreConfig);

        const wrapperA = shallowMount(TimeRelative, { store, localVue,
            propsData: {}
        });
        expect(wrapperA.find('time').attributes('datetime'), 'Datetime related to store date').eq(datetime);

        const customDatetime = '2019-03-19T12:30:45.000Z';
        const wrapperB = shallowMount(TimeRelative, { store, localVue,
            propsData: {
                date: customDatetime,
                mode: 'time'
            }
        });
        expect(
            wrapperB.find('time').attributes('datetime'),
            'Datetime related to custom date'
        ).eq(customDatetime);

        const wrapperC = shallowMount(TimeRelative, { store, localVue,
            propsData: {
                date: customDatetime,
                mode: 'duration'
            }
        });
        expect(
            wrapperC.find('time').attributes('datetime'),
            'Datetime related to duration'
        ).eq('PT30M45S');
    });

});
