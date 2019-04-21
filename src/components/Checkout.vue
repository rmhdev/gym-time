<template>
    <div v-if="customerCheckout">
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-4">Checkout</h1>
                <p class="lead">
                    <span class="gym-customer-name">{{ customerCheckout.name.value }}</span>
                    <time class="gym-customer-checkin text-nowrap" :datetime="customerCheckout.checkIn().toISOString()">
                        {{ renderCheckinTime }}
                    </time>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import {TimeFormatter} from "@/domain/model/TimeFormatter";
    import {Customer} from "@/domain/model/customer/Customer";

    export default {
        name: 'Checkout',
        data() {
            return {
                customerCheckout: this.customer
            }
        },
        props: {
            customer: {
                type: Customer,
                default: null
            }
        },
        computed: {
            renderCheckinTime() {
                return (new TimeFormatter()).format(this.customerCheckout.checkIn());
            }
        }
    }
</script>

<style lang="scss">

</style>
