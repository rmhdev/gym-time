<template>
    <div>
        <form action="#" method="get" class="gym-search-text-form">
            <div class="form-group">
                <label :for="id + '_value'" v-if="label !== ''">{{ label }}</label>
                <input
                    type="text"
                    class="form-control"
                    :id="id + '_value'"
                    :name="defaultName"
                    :placeholder="placeholder"
                    v-model="fieldValue"
                    @keyup="submit"
                >
            </div>

            <button type="submit" class="btn btn-success btn-sm sr-only">Search</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'SearchText',
        data() {
            return {
                fieldValue: ''
            }
        },
        props: {
            id: {
                type: String,
                default() {
                    return Math.random().toString(16).substring(2);
                }
            },
            label: { type: String, default: '' },
            name: { type: String, default: '' },
            placeholder: { type: String, default: '' }
        },
        computed: {
            defaultName() {
                if (this.name !== '') {
                    return this.name;
                }

                return this.id;
            },
        },
        methods: {
            submit() {
                this.$emit('search:by', this.fieldValue);
            }
        }
    }
</script>

<style lang="scss">

</style>
