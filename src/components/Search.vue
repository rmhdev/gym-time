<template>
    <div id="search">
        <form>
            <div class="form-group">
                <div class="form-check form-check-inline gym-search-category">
                    <input
                        type="radio"
                        class="form-check-input"
                        id="search_category_all"
                        name="search[category]"
                        value=""
                        :checked="'' === category"
                        @change="setCategory('')"
                    ><label class="form-check-label" for="search_category_all">all</label>
                </div>

                <div
                    v-for="cat in categories"
                    :key="cat.value"
                    class="form-check form-check-inline gym-search-category"
                >
                    <input
                        type="radio"
                        class="form-check-input"
                        :id="'search_category_' + cat.value"
                        name="search[category]"
                        :value="cat.value"
                        :checked="cat.value === category"
                        @change="setCategory(cat.value)"
                    ><label
                        class="form-check-label"
                        :for="'search_category_' + cat.value"
                    >{{ cat.name }}</label>
                </div>
            </div>

            <div class="form-group">
                <div class="form-check form-check-inline gym-search-status">
                    <input
                            type="radio"
                            class="form-check-input"
                            id="search_status_all"
                            name="search[status]"
                            value=""
                            :checked="'' === currentStatus"
                            @change="setStatus('')"
                    ><label class="form-check-label" for="search_status_all">all</label>
                </div>
                <div
                    v-for="sta in statuses"
                    :key="sta.value"
                    class="form-check form-check-inline gym-search-status"
                >
                    <input
                        type="radio"
                        class="form-check-input"
                        :id="'search_status_' + sta.value"
                        name="search[status]"
                        :value="sta.value"
                        :checked="sta.value === currentStatus"
                        @change="setStatus(sta.value)"
                    ><label
                        class="form-check-label"
                        :for="'search_status_' + sta.value"
                >{{ sta.value }}</label>
                </div>
            </div>

            <button type="submit" class="btn btn-success btn-lg">Search</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'Search',
        props: {
            categories: Array,
            statuses: Array,
            category: {
                type: String,
                default: ''
            },
            status: {
                type: String,
                default: null
            }
        },
        computed: {
            currentStatus() {
                if (this.status === '') {
                    return '';
                }
                if (undefined === this.statuses) {
                    return '';
                }
                if (null === this.status) {
                    return this.statuses.length ? this.statuses[0].value : '';
                }

                return this.status;
            }
        },
        methods: {
            setCategory(value) {
                this.$emit('search:category', value);
            },
            setStatus(value) {
                this.$emit('search:status', value);
            }
        }
    }
</script>

<style lang="scss">

</style>
