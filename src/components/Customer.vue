<template>
    <div :class="customerClass">
        <div class="gym-customer-info">
            <div class="gym-customer-profile">
                <header>
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
                        <label class="custom-control-label gym-customer-name" :for="inputId">{{ customer.name.value }}</label>
                    </div>

                    <div v-if="customer.category" class="gym-customer-category">
                        <small class="gym-customer-category-name">{{ customer.category.name }}</small>
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
                    class="gym-customer-duration small text-muted d-block"
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

    export default {
        name: 'Customer',
        components: {TimeRelative},
        props: {
            customer: Customer,
            customClass: String,
            disabled: {
                type: Boolean,
                default: false
            }
        },
        comments: {
            TimeRelative
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    .gym-customer-name {
        text-overflow: ellipsis;
    }
</style>
