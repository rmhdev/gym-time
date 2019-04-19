import { expect } from 'chai'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import config from '@/store/config'
import cloneDeep from 'lodash.clonedeep'

describe('store config', () => {
    it('should have an empty repository of customers when created', () => {
        const localVue = createLocalVue();
        localVue.use(Vuex);
        const store = new Vuex.Store(cloneDeep(config));
        expect(store.getters.getRepository.count()).eq(0);
    });
    it('should be able to create and add a new customer', () => {
        const localVue = createLocalVue();
        localVue.use(Vuex);
        const localStore = new Vuex.Store(cloneDeep(config));

        expect(localStore.getters.getRepository.count(), 'Initial repository should be empty').eq(0);
        localStore.dispatch('createAndAddNewCustomer', { 'name': 'Lorem Store' });
        expect(localStore.getters.getRepository.count()).eq(1);
        expect(localStore.getters.getRepository.all()[0].name.value).eq('Lorem Store');
    });
});
