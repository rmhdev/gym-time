import {expect} from 'chai'
import {createLocalVue, shallowMount} from '@vue/test-utils'
import CustomerEdit from '@/components/CustomerEdit.vue'
import {CustomerDataBuilder} from "../domain/model/customer/CustomerDataBuilder";
import Vuex from "vuex";
import storeConfig from "@/store/config";
import cloneDeep from "lodash.clonedeep";

const localVue = createLocalVue();
localVue.use(Vuex);

describe('CustomerEdit.vue', () => {

    let localStoreConfig;
    let customer;
    let wrapper;

    beforeEach(() => {
        localStoreConfig = cloneDeep(storeConfig);
        customer = CustomerDataBuilder.aCustomer()
            .withName('Ms Customer')
            .withCheckIn('2019-03-19T12:00:00.000Z')
            .build();
        let store = new Vuex.Store(localStoreConfig);
        wrapper = shallowMount(CustomerEdit, {store, localVue, propsData : { customer: customer }});
    });

    it('shows a form with editable values from a customer', () => {
        expect(
            wrapper.find('form input[name="customer[name]"]').element.value
        ).eq(customer.name.value);
        expect(
            wrapper.find('form select[name="customer[category]"] option:checked').element.value
        ).eq(customer.category.value);
    });
});
