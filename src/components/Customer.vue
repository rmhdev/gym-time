<template>
    <a :class="customerClass" @click.prevent="toggle" href="#">
        <div class="d-flex w-100 justify-content-between">
            <div class="gym-customer-status-container">
                <span class="gym-customer-status" :class="'gym-customer-status-' + customer.status().value">
                    <span class="gym-customer-status-name">{{ customer.status().value }}</span>
                </span>
            </div>
            <span class="gym-customer-initials" aria-hidden="true">
                <span class="gym-customer-initials-value">
                    {{ customer.name.initials() }}
                </span>
            </span>
            <div>
                <h5 class="gym-customer-name">
                    {{ customer.name.value }}
                </h5>
                <div v-if="customer.category" class="gym-customer-category">
                    <small class="gym-customer-category-name">{{ customer.category.name }}</small>
                </div>
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
            </div>
        </div>
    </a>
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
