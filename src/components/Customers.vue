<template>
    <div>
        <div class="card">
            <div class="card-header">
                <search
                    :categories="categories"
                    :statuses="statuses"
                    v-on:search:category="searchCategory($event)"
                    v-on:search:status="searchStatus($event)"
                ></search>
            </div>

            <div class="gym-customers">
                <div v-if="isEmpty" class="gym-empty alert alert-info text-center" role="alert">
                    <h4 class="gym-title alert-heading">Gym is empty!</h4>
                    <p>Looks like you'll be the first one!</p>
                </div>

                <template v-else>
                    <div class="list-group list-group-flush">
                        <customer
                            class="gym-customer"
                            custom-class="list-group-item list-group-item-action"
                            v-for="customer in customers"
                            :key="customer.id.value"
                            :customer="customer"
                        ></customer>
                    </div>
                    <div class="card-footer text-muted">
                        test
                    </div>
                </template>
            </div>
        </div>


    </div>
</template>

<script>
    import Customer from "@/components/Customer";
    import Search from "@/components/Search";
    import { CustomerStatus } from "@/domain/model/customer/CustomerStatus";

    export default {
        name: 'Customers',
        components: {
            Customer,
            Search
        },
        computed: {
            customers() {
                return this.$store.getters.getFilteredCustomers
            },
            isEmpty() {
                return this.customers.length === 0;
            },
            categories() {
                return this.$store.getters.getCategories;
            },
            statuses() {
                return CustomerStatus.all();
            }
        },
        methods: {
            searchCategory(category) {
                return this.$store.dispatch('updateCustomerQueryValue', { category: category });
            },
            searchStatus(status) {
                return this.$store.dispatch('updateCustomerQueryValue', { status: status });
            }
        }
    }
</script>

<style lang="scss">

</style>
