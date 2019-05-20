<template>
    <div>
        <form action="#" method="get" class="gym-search-text-form" @submit="submit">
            <div class="form-group">
                <label :for="id + '_value'" v-if="label !== ''">{{ label }}</label>
                <div :class="{ 'input-group mb-3': hasValue }">
                    <input
                        type="text"
                        class="form-control"
                        :id="id + '_value'"
                        :name="defaultName"
                        :placeholder="placeholder"
                        v-model="fieldValue"
                        @keyup="submit"
                    >
                    <div v-if="hasValue" class="input-group-append">
                        <span class="input-group-text">
                            <button type="button" class="close gym-search-restart" aria-label="Clear" @click="restart">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </span>
                    </div>
                </div>
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
                fieldValue: this.value
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
            placeholder: { type: String, default: '' },
            value: { type: String, default: '' },
        },
        computed: {
            hasValue() {
                return (this.fieldValue !== '');
            },
            defaultName() {
                if (this.name !== '') {
                    return this.name;
                }

                return this.id;
            },
        },
        methods: {
            restart() {
                this.fieldValue = '';
                this.submit();
            },
            submit() {
                this.$emit('search:by', this.fieldValue);
            }
        }
    }
</script>

<style lang="scss">

</style>
