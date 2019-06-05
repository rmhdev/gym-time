<template>
    <div class="gym-welcome">
        <header>
            <h1 class="gym-welcome-title">{{ msg }}</h1>
        </header>

        <a class="gym-welcome-button" href="#" @click.prevent="close">Enter</a>

        <Clock class="gym-welcome-clock"/>
    </div>
</template>

<script>
    import Clock from "@/components/Clock";

    export default {
        name: 'Welcome',
        props: {
            msg: String
        },
        components: {
            Clock
        },
        methods: {
            close() {
                this.$emit('close');
            }
        }
    }
</script>

<style lang="scss">
</style>
