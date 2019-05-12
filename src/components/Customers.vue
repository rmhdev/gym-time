<template>
    <div>
        <search
            :categories="categories"
        ></search>
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
            ></customer>
        </div>
    </div>
</template>

<script>
    import Customer from "@/components/Customer";
    import Search from "@/components/Search";

    export default {
        name: 'Customers',
        components: {
            Customer,
            Search
        },
        computed: {
            customers() {
                return this.$store.getters.getFilteredCustomers;
            },
            isEmpty() {
                return this.customers.length === 0;
            },
            categories() {
                return this.$store.getters.getCategories;
            }
        }
    }
</script>

<style lang="scss">

</style>
