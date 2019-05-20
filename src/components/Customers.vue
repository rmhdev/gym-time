<template>
    <div>
        <div class="card">
            <div class="card-header">
                <search
                    id="search_category"
                    name="search[category]"
                    :choices="categories"
                    placeholder="all"
                    :value="$store.getters.getCustomerQuery.get('category', '')"
                    v-on:search:by="searchBy('category', $event)"
                ></search>
                <search-text
                    id="search_name"
                    name="search[name]"
                    placeholder="Search by name"
                    label="Name:"
                    :value="$store.getters.getCustomerQuery.get('name', '')"
                ></search-text>
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
                </template>
            </div>

            <div class="card-footer text-muted">
                <search
                    id="search_status"
                    name="search[status]"
                    :choices="statuses"
                    :value="$store.getters.getCustomerQuery.get('status', '')"
                    placeholder="all"
                    v-on:search:by="searchBy('status', $event)"
                ></search>
            </div>
        </div>
    </div>
</template>

<script>
    import Customer from "@/components/Customer";
    import Search from "@/components/Search";
    import SearchText from "@/components/SearchText";
    import { CustomerStatus } from "@/domain/model/customer/CustomerStatus";

    export default {
        name: 'Customers',
        components: {
            Customer,
            Search,
            SearchText
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
            searchBy(name, value) {
                return this.$store.dispatch('updateCustomerQueryValue', { name: name, value: value });
            },
        }
    }
</script>

<style lang="scss">

</style>
