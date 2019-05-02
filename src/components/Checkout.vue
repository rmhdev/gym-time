<template>
    <div class="card gym-checkout">
        <h2 class="card-header">Checkout</h2>
        <div
            v-if="isEmpty"
            class="alert alert-warning gym-checkout-empty"
            role="alert"
        >
            Select customers from the list!
        </div>
        <div v-else>
            <ul
                class="list-group list-group-flush gym-checkout-customers"
            >
                <li
                    class="list-group-item gym-checkout-customer"
                    v-for="customer in checkoutCustomers"
                    :key="customer.id"
                    :id="'gym-customer-checkout-' + customer.id"
                >
                    {{ customer.id }}

                    <button
                        type="button"
                        class="float-right close gym-customer-checkout-cancel"
                        aria-label="Remove"
                        @click.prevent="removeCustomer(customer.id)"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </li>
            </ul>

            <a
                href="#"
                class="btn btn-danger gym-checkout-cancel"
                @click.prevent="cancel"
            >Cancel</a>
        </div>
    </div>


</template>

<script>
    export default {
        name: 'Checkout',
        computed: {
            isEmpty() {
                return this.checkoutCustomers.length === 0;
            },
            checkoutCustomers() {
                return this.$store.getters.getCheckoutCustomers;
            }
        },
        methods: {
            removeCustomer(id) {
                return this.$store.dispatch('toggleCheckoutCustomer', { id: id });
            },
            cancel() {
                return this.$store.dispatch('emptyCheckoutCustomers');
            }
        }
    }
</script>

<style lang="scss">

</style>
