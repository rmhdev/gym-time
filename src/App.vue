<template>
    <div id="app" class="container">

        <Welcome v-if="isWelcome" msg="Welcome!" class="gym-welcome" @close="isWelcome = false"/>

        <div v-else class="row justify-content-md-center">
            <div class="col-5">
                <checkout
                    v-if="hasCheckoutCustomer"
                    class="gym-customer-confirm-checkout"
                ></checkout>
                <checkin
                    v-else
                ></checkin>
                <Clock/>
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
        name: 'App',
        data() {
            return {
                isWelcome: true
            }
        },
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
