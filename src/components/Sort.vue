<template>
    <div v-if="hasFields">
        <div class="btn-group" role="group" aria-label="Sort">
            <a
                v-for="field in fields"
                v-bind:key="field"
                href="#"
                class="btn btn-sm btn-outline-secondary gym-sort"
                :class="getClass(field)"
                :data-active="isActive(field)"
                :data-value="getValue(field)"
                :data-order="getOrder(field)"
                @click.prevent="toggle(field)"
            >{{ field }}</a>
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
                activeOrder: this.order
            }
        },
        computed: {
            hasFields() {
                return this.fields.length > 0;
            }
        },
        methods: {
            toggle(field) {
                if (this.activeValue === this.getValue(field)) {
                    this.activeOrder = (this.activeOrder === 'asc') ? 'desc' : 'asc';
                } else {
                    this.activeValue = this.getValue(field);
                    this.activeOrder = 'asc';
                }
                this.$emit('sort:by', this.activeValue, this.activeOrder);
            },
            isActive(field) {
                return this.activeValue === this.getValue(field);
            },
            getValue(field) {
                return field;
            },
            getClass(field) {
                let classes = [];
                if (this.isActive(field)) {
                    classes.push('active');
                    classes.push(this.activeOrder);
                }
                return classes.join(' ');
            },
            getOrder(field) {
                if (this.isActive(field)) {
                    return this.activeOrder;
                }
                return '';
            }
        },
        mounted() {
            if (!this.activeValue) {
                if (this.hasFields) {
                    return this.activeValue = this.getValue(this.fields[0]);
                }
            }
        }
    }
</script>

<style lang="scss">

</style>
