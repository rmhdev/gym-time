<template>
    <div>
        <form action="#" method="get" @submit.prevent="submit">
            <div class="form-group">
                <div v-if="placeholder !== ''" class="form-check form-check-inline gym-search-choice">
                    <input
                        type="radio"
                        class="form-check-input"
                        :id="id + '_placeholder'"
                        :name="defaultName"
                        value=""
                        :checked="'' === currentValue"
                        @change="setValue('')"
                    ><label class="form-check-label" :for="id + '_placeholder'">{{ placeholder }}</label>
                </div>

                <div
                    v-for="choice in choices"
                    :key="choice.value"
                    class="form-check form-check-inline gym-search-choice"
                >
                    <input
                        type="radio"
                        class="form-check-input"
                        :id="id + '_' + choice.value"
                        :name="defaultName"
                        :value="choice.value"
                        :checked="choice.value === currentValue"
                        @change="setValue(choice.value)"
                    ><label
                        class="form-check-label"
                        :for="id + '_' + choice.value"
                    >{{ choice.value }}</label>
                </div>
            </div>

            <button type="submit" class="btn btn-success btn-sm">Search</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'Search',
        props: {
            id: {
                type: String,
                default() {
                    return Math.random().toString(16).substring(2);
                }
            },
            choices: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            value: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: ''
            },
        },
        computed: {
            defaultName() {
                if (this.name !== null && this.name !== '') {
                    return this.name;
                }

                return this.id;
            },
            currentValue() {
                if (this.placeholder === '' && this.value === '') {
                    return this.choices.length ? this.choices[0].value : '';
                }

                return this.value;
            }
        },
        methods: {
            setValue(value) {
                this.$emit('search:by', value);
            },
            submit() {
                this.setValue(this.value);
            }
        }
    }
</script>

<style lang="scss">

</style>
