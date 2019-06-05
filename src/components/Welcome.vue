<template>
    <div>
        <header>
            <h1>{{ msg }}</h1>
        </header>

        <Clock/>

        <a class="btn btn-lg btn-primary" href="#" @click.prevent="close">Enter</a>
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
