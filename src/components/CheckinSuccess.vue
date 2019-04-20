<template>
    <div>
        <div class="gym-customer-added alert alert-info" role="alert">
            <h4 class="gym-title alert-heading">Success</h4>
            <p>Enjoy your Gym Time!</p>

            <a class="gym-feedback-button btn btn-success" role="button" @click.prevent="close">Ok</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CheckinSuccess',
        methods: {
            close() {
                this.$emit('close');
            }
        }
    }
</script>

<style lang="scss">

</style>
