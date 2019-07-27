<template>
    <div :class="customerClass">
        <div v-if="isEditing" class="gym-customer-editable">
            <customer-form
                    :customer="this.customer"
                    v-on:submit:customer="onSubmitCustomer"
                    mode="edit"
                    class="gym-customer-form-edit"
            ></customer-form>
            <a href="#" class="gym-customer-edit-close" @click.prevent="isEditing = false">close</a>
        </div>
        <div v-else class="gym-customer-info">
            <div class="gym-customer-profile">
                <header class="gym-customer-selectable">
                    <div class="custom-control custom-switch">
                        <input
                            class="custom-control-input"
                            type="checkbox"
                            :id="inputId"
                            name="customer[id][]"
                            :value="this.customer.id.value"
                            :checked="isSelected"
                            :disabled="disabled"
                            @change="toggle"
                        >
                        <label class="custom-control-label gym-customer-name" :for="inputId">{{ customerName }}</label>

                        <a v-if="!isSelected" href="#" class="gym-customer-edit" @click.prevent="isEditing = true">
                            <span class="gym-action">
                                <span class="gym-action-label">edit</span>
                            </span>
                        </a>
                    </div>

                    <div v-if="customer.category" class="gym-customer-category" :data-category="customerCategory">
                        <small class="gym-customer-category-name">
                            {{ customerCategory }}
                        </small>
                    </div>
                </header>
            </div>

            <div class="gym-customer-times">
                <time-relative
                    :from="customer.checkIn().toISOString()"
                    mode="from"
                    class="gym-customer-checkin"
                ></time-relative>
                <time-relative
                    v-if="customer.checkOut() !== null"
                    :from="customer.checkIn().toISOString()"
                    :to="customer.checkOut().toISOString()"
                    mode="duration"
                    class="gym-customer-duration"
                ></time-relative>
                <div v-else>
                    <span class="gym-customer-status" :class="'gym-customer-status-' + customer.status().value">
                        <span class="gym-customer-status-name">{{ customer.status().value }}</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Customer} from "@/domain/model/customer/Customer";
    import TimeRelative from '@/components/TimeRelative.vue'
    import CustomerForm from '@/components/CustomerForm.vue'

    export default {
        name: 'Customer',
        components: {
            TimeRelative,
            CustomerForm
        },
        props: {
            customer: Customer,
            customClass: String,
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                isEditing: false,
                customerName: this.customer.name.value,
                customerCategory: this.customer.category
            }
        },
        computed: {
            inputId() {
                return 'customer_id_' + this.customer.id.value;
            },
            isSelected() {
                return this.$store.getters.isCheckoutCustomer({id: this.customer.id.value });
            },
            customerClass() {
                return this.customClass
                    + (this.disabled ?  '' : ' gym-customer-enabled')
                    + (this.isSelected ? ' gym-customer-selected' : '')
                ;
            }
        },
        methods: {
            toggle() {
                if (!this.disabled) {
                    this.$store.dispatch('toggleCheckoutCustomer', { id: this.customer.id.value });
                }
            },
            onSubmitCustomer(payload) {
                this.isEditing = false;
                this.customerName = payload.name;
                this.customerCategory = payload.category;
            }
        }
    }
</script>

<style lang="scss"></style>
