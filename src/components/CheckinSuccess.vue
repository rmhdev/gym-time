<template>
    <div>
        <div class="gym-customer-added card" role="alert">
            <div class="card-body">
                <h5 class="gym-title card-title">Success</h5>
                <p class="card-text">Enjoy your Gym Time!</p>
                <a
                    class="gym-feedback-button btn btn-lg btn-primary"
                    role="button"
                    @click.prevent="close"
                    href="#"
                    ref="button"
                >Ok</a>
            </div>
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
        },
        mounted() {
            this.$refs.button.focus();
        }
    }
</script>

<style lang="scss">

</style>
