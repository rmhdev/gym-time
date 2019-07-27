<template>
    <div id="app" class="gym-container">

        <div v-if="isWelcome" class="gym-welcome-container">
            <Welcome msg="Hello!" @close="isWelcome = false"/>
        </div>

        <div v-else class="gym-content">
            <div class="gym-content-in-out">
                <checkout
                    v-if="hasCheckoutCustomer"
                    class="gym-customer-confirm-checkout"
                ></checkout>
                <checkin
                    v-else
                ></checkin>
                <Clock/>
            </div>

            <div class="gym-content-customers">
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
