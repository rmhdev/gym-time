import {expect} from 'chai'
import {createLocalVue, shallowMount} from '@vue/test-utils'
import TimeRelative from '@/components/TimeRelative.vue'
import lodash from "lodash";
import Vuex from "vuex";
const localVue = createLocalVue();
import storeConfig from "@/store/config";

localVue.use(Vuex);

describe('TimeRelative.vue', () => {

    it('renders the time in 24H format by default', () => {
        let localStoreConfig = lodash.cloneDeep(storeConfig);
        localStoreConfig.state.datetime = '2019-03-19T19:34:56';
        let store = new Vuex.Store(localStoreConfig);

        const wrapper = shallowMount(TimeRelative, { store, localVue });

        expect(wrapper.find('.gym-time-relative').text()).eq('19:34')
    });

    it('renders the time in AM/PM format when defined', () => {
        let localStoreConfig = lodash.cloneDeep(storeConfig);
        localStoreConfig.state.datetime = '2019-03-19T19:34:56';
        localStoreConfig.state.hour12 = true;
        let store = new Vuex.Store(localStoreConfig);
        const wrapper = shallowMount(TimeRelative, { store, localVue });

        expect(wrapper.find('.gym-time-relative').text()).eq('7:34 PM')
    });

    it('renders a custom time if defined', () => {
        let localStoreConfig = lodash.cloneDeep(storeConfig);
        localStoreConfig.state.datetime = '2019-03-19T19:34:56';
        let store = new Vuex.Store(localStoreConfig);
        const wrapper = shallowMount(TimeRelative, { store, localVue, propsData: {
            from: '2019-03-19T07:11:22'
        }});

        expect(wrapper.find('.gym-time-relative').text()).eq('07:11');
    });

    it('renders depending on the mode defined', () => {
        const fromDatetime = '2019-03-19T18:00:00';
        const toDatetime = '2019-03-19T18:22:33';
        const data = [
            {
                propsData: {
                    mode: 'auto'
                },
                expected: '18:30',
                comment: 'mode auto, no dates defined'
            },
            {
                propsData: {
                    mode: 'auto',
                    from: fromDatetime
                },
                expected: '18:00',
                comment: 'mode auto, with date from',
            },
            {
                propsData: {
                    mode: 'auto',
                    from: fromDatetime,
                    to: toDatetime
                },
                expected: '22m 33s',
                comment: 'mode auto, with dates from and to',
            },
            {
                propsData: {
                    mode: 'from',
                    from: fromDatetime,
                    to: toDatetime
                },
                expected: '18:00',
                comment: 'mode from, with dates from and to',
            },
            {
                propsData: {
                    mode: 'duration',
                    from: fromDatetime,
                    to: toDatetime
                },
                expected: '22m 33s',
                comment: 'mode duration, with dates from and to',
            },
            {
                propsData: {
                    mode: 'duration',
                    from: fromDatetime
                },
                expected: '30m 45s',
                comment: 'mode duration, with date from',
            },
            {
                propsData: {
                    mode: 'time'
                },
                expected: '18:30',
                comment: 'mode time, no dates defined'
            },
            {
                propsData: {
                    mode: 'time',
                    from: fromDatetime,
                    to: toDatetime
                },
                expected: '18:30',
                comment: 'mode time, must ignore dates "from" and "to"',
            },
            {
                propsData: {
                    mode: 'date'
                },
                expected: 'Tuesday, March 19, 2019',
                comment: 'mode date, no dates defined'
            },
            {
                propsData: {
                    mode: 'date',
                    from: fromDatetime,
                    to: toDatetime
                },
                expected: 'Tuesday, March 19, 2019',
                comment: 'mode date, must ignore dates "from" and "to"',
            },
        ];

        let localStoreConfig = lodash.cloneDeep(storeConfig);
        localStoreConfig.state.datetime = '2019-03-19T18:30:45';
        let store = new Vuex.Store(localStoreConfig);

        data.forEach(function (testData) {
            const wrapper = shallowMount(TimeRelative, { store, localVue, propsData: testData.propsData });

            expect(wrapper.find('.gym-time-relative').text(), testData.comment).eq(testData.expected);
        });
    });

    it('renders a fixed duration', () => {
        let localStoreConfig = lodash.cloneDeep(storeConfig);
        localStoreConfig.state.datetime = '2019-03-19T12:44:55';
        let store = new Vuex.Store(localStoreConfig);
        const wrapper = shallowMount(TimeRelative, { store, localVue, propsData: {
                from: '2019-03-19T12:00:00',
                to: '2019-03-19T12:22:33',
                mode: 'duration'
            }});

        expect(wrapper.find('.gym-time-relative').text()).eq('22m 33s');
    });

    it('renders time related attributes', () => {
        const datetime = '2019-03-19T12:30:45.000Z';
        let localStoreConfig = lodash.cloneDeep(storeConfig);
        localStoreConfig.state.datetime = datetime;
        let store = new Vuex.Store(localStoreConfig);

        const wrapperA = shallowMount(TimeRelative, { store, localVue, propsData: {}});
        expect(
            wrapperA.find('time').attributes('datetime'),
            'Datetime related to store date'
        ).eq(datetime);

        const fromDatetime = '2019-03-19T12:00:00.000Z';
        const wrapperB = shallowMount(TimeRelative, { store, localVue,
            propsData: {
                from: fromDatetime,
                mode: 'from'
            }
        });
        expect(
            wrapperB.find('time').attributes('datetime'),
            'Datetime related to from date'
        ).eq(fromDatetime);

        const wrapperC = shallowMount(TimeRelative, { store, localVue,
            propsData: {
                from: fromDatetime,
                mode: 'duration'
            }
        });
        expect(
            wrapperC.find('time').attributes('datetime'),
            'Datetime related to duration'
        ).eq('PT30M45S');
    });

});
