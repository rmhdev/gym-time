import { expect } from 'chai'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import store from '@/store/store'
import cloneDeep from 'lodash.clonedeep'

describe('store.js', () => {
    it('should have an empty repository of customers when created', () => {
        const localVue = createLocalVue();
        localVue.use(Vuex);
        const localStore = new Vuex.Store(cloneDeep(store));

        expect(localStore.state.customerRepository.count()).eq(0);
    });
    //it('should be able to commit a new customer', () => {
    //    const localVue = createLocalVue();
    //    localVue.use(Vuex);
    //    const localStore = new Vuex.Store(cloneDeep(store));
    //    expect(localStore.state.customerRepository.count(), 'New repo should be empty').eq(0);
    //
    //    localStore.commit('addCustomer', { 'name': 'Lorem Store' });
    //    expect(localStore.state.customerRepository.count()).eq(1);
    //    expect(localStore.state.customerRepository.all()[0].name.value).eq('Lorem Store');
    //});
});
