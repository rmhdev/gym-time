<template>
    <div>
        <customer-form
            v-on:submit:customer="submit"
            :customer="customer"
        ></customer-form>
    </div>
</template>


<script>
    import {Customer} from "@/domain/model/customer/Customer";
    import CustomerForm from "./CustomerForm";

    export default {
        name: 'CustomerEdit',
        components: {CustomerForm},
        props: {
            customer: Customer,
        },
        methods: {
            submit(payload) {
                this.$store.dispatch('updateCustomer', {
                    ...payload,
                    id: this.customer.id.value,
                });
                this.$emit('submit:customer', payload);
            }
        }
    }
</script>


<style>
</style>
