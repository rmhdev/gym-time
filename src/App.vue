<template>
    <div id="app" class="container">

        <div class="text-center">
            <Welcome msg="Welcome!"/>
            <Clock/>
        </div>

        <div class="row justify-content-md-center">
            <div class="col-5">
                <checkout
                    v-if="hasCheckoutCustomer"
                    class="gym-customer-confirm-checkout"
                ></checkout>
                <checkin
                    v-else
                ></checkin>
            </div>
            <div class="col-1"></div>
            <div class="col-6">
                <customers></customers>
            </div>
        </div>
    </div>
</template>

<script>
    import Welcome from './components/Welcome.vue'
    import Clock from "./components/Clock";
    import Checkin from "./components/Checkin";
    import Checkout from "./components/Checkout";
    import Customers from "./components/Customers";

    export default {
        name: 'app',
        computed: {
            hasCheckoutCustomer() {
                return this.$store.getters.getCheckoutCustomers.length > 0;
            }
        },
        components: {
            Checkout,
            Clock,
            Welcome,
            Checkin,
            Customers
        }
    }
</script>

<style lang="scss">

</style>
