<template>
    <a :class="customClass" @click.prevent="checkout" href="#">
        <div class="d-flex w-100 justify-content-between">
            <h5 class="gym-customer-name mb-1">
                {{ customer.name.value }}
            </h5>
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
            }
        },
        methods: {
            checkout() {
                this.$emit('checkout', { id: this.customer.id.value });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .gym-customer-name {
        text-overflow: ellipsis;
    }
</style>
