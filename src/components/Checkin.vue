<template>
    <section class="gym-checkin">
        <div v-if="isFormSubmitted">
            <checkin-success class="gym-checkin-success" @close="restartForm"></checkin-success>
        </div>

        <div v-else>
            <customer-form v-on:submit:customer="submit"></customer-form>
        </div>
    </section>
</template>

<script>
    import CheckinSuccess from "@/components/CheckinSuccess.vue";
    import CustomerForm from "@/components/CustomerForm.vue";

    export default {
        name: 'Checkin',
        components: {
            CheckinSuccess,
            CustomerForm
        },
        props: {},
        data() {
            return {
                isSubmitted: false
            }
        },
        computed: {
            isFormSubmitted() {
                return this.isSubmitted;
            }
        },
        methods: {
            restartForm() {
                this.isSubmitted = false;
            },
            submit(payload) {
                this.isSubmitted = true;
                this.$store.dispatch('createAndAddNewCustomer', payload);
            }
        }
    }
</script>

<style lang="scss">

</style>
