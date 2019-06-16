<template>
    <div v-if="hasFields">
        <div class="btn-group" role="group" aria-label="Sort">
            <a
                v-for="choice in choices"
                v-bind:key="choice.value"
                href="#"
                class="btn btn-sm btn-outline-secondary gym-sort"
                :class="getClass(choice.value)"
                :data-active="choice.value === activeValue"
                :data-value="choice.value"
                :data-order="getOrder(choice.value)"
                @click.prevent="toggle(choice.value)"
            >{{ choice.label }}</a>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'Sort',
        props: {
            id: { type: String, default: '' },
            fields: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            selected: {
                type: String
            },
            order: {
                type: String,
                default: 'asc',
                validator: function (value) {
                    return ['asc', 'desc'].indexOf(value) !== -1
                }
            },

        },
        data() {
            return {
                activeValue: this.selected,
                choices: []
            }
        },
        computed: {
            hasFields() {
                return this.choices !== {};
            }
        },
        methods: {
            getClass(value) {
                if (value === this.activeValue) {
                    return 'active ' + this.getOrder(value);
                }
                return '';
            },
            getOrder(value) {
                return this.choices[value].order;
            },
            toggle(value) {
                if (this.activeValue !== value) {
                    this.activeValue = value;
                } else {
                    this.choices[value].order = this.choices[value].order === 'asc' ? 'desc' : 'asc';
                }

                this.$emit('sort:by', value, this.choices[value].order);
            }
        },
        mounted() {
            let defaultValue = null;
            let choices = {};
            this.fields.forEach(function (field) {
                let value = (field.value === undefined) ? field.toString() : field.value;
                let label = (field.label === undefined) ? '' : field.label;
                if (label === '') {
                    label = value
                        .replace(/([A-Z])/g, " $1")
                        .replace(/[_\-/]/g, ' ')
                        .replace(/\s\s+/g, ' ')
                        .trim()
                    ;
                    if (label) {
                        label = label.charAt(0).toUpperCase() + label.slice(1);
                    }
                }
                choices[value] = {
                    value: value,
                    label: label,
                    order: this.order
                };
                if (defaultValue === null) {
                    defaultValue = value;
                }
            }, this);
            this.choices = choices;
            if (!this.activeValue) {
                this.activeValue = defaultValue;
            }
        }
    }
</script>

<style lang="scss">

</style>
