<template>
    <div :class="customClass">
        <div class="d-flex w-100 justify-content-between">
            <h5 class="gym-customer-name mb-1 text-nowrap">
                {{ customer.name.value }}
            </h5>
            <time class="gym-customer-checkin text-nowrap" :datetime="customer.checkIn().toISOString()">
                {{ renderCheckinTime }}
            </time>
        </div>
    </div>
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
        }
    }
</script>

<style lang="scss" scoped>
    .gym-customer-name {
        text-overflow: ellipsis;
    }
</style>
