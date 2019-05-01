<template>
    <div>
        <div class="list-group gym-customers">
            <div v-if="isEmpty" class="gym-empty alert alert-info text-center" role="alert">
                <h4 class="gym-title alert-heading">Gym is empty!</h4>
                <p>Looks like you'll be the first one!</p>
            </div>

            <customer
                v-else
                class="gym-customer"
                custom-class="list-group-item list-group-item-action"
                v-for="customer in customers"
                :key="customer.id.value"
                :customer="customer"
                @checkout="onCustomerCheckout"
            ></customer>
        </div>
    </div>
</template>

<script>
    import Customer from "@/components/Customer";

    export default {
        name: 'Customers',
        components: {
            Customer
        },
        methods: {
            onCustomerCheckout(event) {
                //this.$emit('checkout', event);
            }
        },
        computed: {
            customers() {
                return this.$store.getters.getRepository.all();
            },
            isEmpty() {
                return this.$store.getters.getRepository.count() === 0;
            }
        }
    }
</script>

<style lang="scss">

</style>
