<template>
    <a :class="customerClass" @click.prevent="toggle" href="#">
        <div class="d-flex w-100 justify-content-between">
            <span class="gym-customer-initials" aria-hidden="true">
                <span class="gym-customer-initials-value">
                    {{ customer.name.initials() }}
                </span>
            </span>
            <div>
                <h5 class="gym-customer-name">
                    {{ customer.name.value }}
                </h5>
                <small v-if="customer.category" class="badge badge-pill badge-secondary gym-customer-category">
                    {{ customer.category.name }}
                </small>
            </div>

            <div class="">
                <time-relative
                    :date="customer.checkIn().toISOString()"
                    mode="time"
                    class="gym-customer-checkin"
                ></time-relative>
                <!-- TODO: this should not be a time-relative component -->
                <time-relative
                    v-if="customer.checkOut() !== null"
                    :date="customer.checkOut().toISOString()"
                    mode="duration"
                    class="gym-customer-duration display-block small text-muted w-100"
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
            customClass: String
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
                    + (this.isSelected ? ' gym-customer-selected' : '')
                ;
            }
        },
        methods: {
            toggle() {
                this.$store.dispatch('toggleCheckoutCustomer', { id: this.customer.id.value });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .gym-customer-name {
        text-overflow: ellipsis;
    }
</style>
