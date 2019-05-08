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
            <time class="gym-customer-checkin text-nowrap" :datetime="customer.checkIn().toISOString()">
                {{ renderCheckinTime }}
            </time>
        </div>
    </a>
</template>

<script>
    import {Customer} from "@/domain/model/customer/Customer";
    import {TimeFormatter} from "@/domain/model/TimeFormatter";

    export default {
        name: 'Customer',
        props: {
            customer: Customer,
            customClass: String
        },
        computed: {
            renderCheckinTime() {
                return (new TimeFormatter()).format(this.customer.checkIn());
            },
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
