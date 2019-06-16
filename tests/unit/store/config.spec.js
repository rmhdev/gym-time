import { expect } from 'chai'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import config from '@/store/config'
import cloneDeep from 'lodash.clonedeep'
import {CustomerDataBuilder} from "../domain/model/customer/CustomerDataBuilder";
import {CustomerCategory} from "@/domain/model/customer/CustomerCategory";
import {CustomerQuery} from "@/domain/model/customer/CustomerQuery";

describe('store config', () => {
    it('should have an empty repository of customers when created', () => {
        const localVue = createLocalVue();
        localVue.use(Vuex);
        const store = new Vuex.Store(cloneDeep(config));
        expect(store.getters.getRepository.count()).eq(0);
    });
    it('should be able to dispatch the creation and addition of a new customer', () => {
        const localVue = createLocalVue();
        localVue.use(Vuex);
        const localStore = new Vuex.Store(cloneDeep(config));

        expect(localStore.getters.getRepository.count(), 'Initial repository should be empty').eq(0);
        localStore.dispatch('createAndAddNewCustomer', {
            name: 'Lorem Store',
            category: 'random'
        });
        expect(localStore.getters.getRepository.count()).eq(1);
        expect(localStore.getters.getRepository.all()[0].name.value).eq('Lorem Store');
    });
    it('should be able to commit a new customer', () => {
        const localVue = createLocalVue();
        localVue.use(Vuex);
        const localStore = new Vuex.Store(cloneDeep(config));

        expect(localStore.getters.getRepository.count(), 'Initial repository should be empty').eq(0);
        localStore.commit('addCustomer', CustomerDataBuilder.aCustomer().withName('Lorem Commit').build());
        expect(localStore.getters.getRepository.count()).eq(1);
        expect(localStore.getters.getRepository.all()[0].name.value).eq('Lorem Commit');
    });
    it('should have an empty list of customer ready to be checked out', () => {
        const localVue = createLocalVue();
        localVue.use(Vuex);
        const store = new Vuex.Store(cloneDeep(config));
        expect(store.getters.getCheckoutCustomers).to.eql([]);
    });
    it('should have default list of categories', () => {
        const localVue = createLocalVue();
        localVue.use(Vuex);
        const store = new Vuex.Store(cloneDeep(config));
        expect(store.getters.getCategories).to.eql([
            new CustomerCategory('public')
        ]);
    });
    it('should have default query', () => {
        const localVue = createLocalVue();
        localVue.use(Vuex);
        const store = new Vuex.Store(cloneDeep(config));
        const expected = CustomerQuery.fromJSON({
            value: { status: 'active', date: null },
            sortBy: { checkIn: 'desc' },
        });
        expect(store.getters.getCustomerQuery).to.eql(expected);
    });
    it('should have a date', () => {
        const localVue = createLocalVue();
        localVue.use(Vuex);
        const store = new Vuex.Store(cloneDeep(config));
        expect(store.getters.getDate).to.be.an.instanceof(Date);
    });
});
