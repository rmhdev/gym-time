<template>
    <a
        href="#"
        class="btn btn-sm btn-outline-secondary gym-sort"
        :class="className"
        :id="id"
        @click.prevent="toggle"
    >{{ label }}</a>
</template>

<script>
    export default {
        name: 'Sort',
        props: {
            id: { type: String, default: '' },
            order: { type: String, default: '' },
            label: { type: String, default: '?' },
        },
        data() {
            return {
                className: this.order
            }
        },
        methods: {
            toggle() {
                this.className = this.className === 'asc' ? 'desc': 'asc';
                this.$emit('sort:order', this.className);
            }
        }
    }
</script>

<style lang="scss">

</style>
