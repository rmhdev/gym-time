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
                    v-on:search:by="searchBy('name', $event)"
                ></search-text>
                <sort
                    id="sort"
                    label="name"
                    :fields="['name', 'checkIn']"
                    :selected="$store.getters.getCustomerQuery.isSortedBy('name') ? 'name' : 'checkIn'"
                    v-on:sort:by="sortBy"
                ></sort>
            </div>

            <div class="gym-customers" data-list="customers">
                <div
                    v-if="isEmpty"
                    class="gym-empty alert alert-info text-center"
                    role="alert"
                    data-alert="empty"
                >
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
                            :disabled="isDisabled(customer.status().value)"
                            data-item="customer"
                        ></customer>
                    </div>
                </template>
            </div>

            <div class="card-footer text-muted">
                <search
                    id="search_status"
                    name="search[status]"
                    :choices="allStatuses"
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
    import Sort from "@/components/Sort";
    import { CustomerStatus } from "@/domain/model/customer/CustomerStatus";

    export default {
        name: 'Customers',
        props: {
            statuses: {
                type: Array,
                default: function () {
                    return [CustomerStatus.createActive().value];
                }
            }
        },
        components: {
            Customer,
            Search,
            SearchText,
            Sort
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
            allStatuses() {
                return CustomerStatus.all();
            }
        },
        methods: {
            searchBy(name, value) {
                return this.$store.dispatch('updateCustomerQueryValue', { name: name, value: value });
            },
            sortBy(name, value) {
                return this.$store.dispatch('updateCustomerQuerySort', { name: name, value: value });
            },
            isDisabled(status) {
                return !this.statuses.includes(status);
            }
        }
    }
</script>

<style lang="scss">

</style>
