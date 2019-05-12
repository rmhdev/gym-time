<template>
    <div id="search">
        <form>
            <div class="form-check form-check-inline gym-search-category">
                <input
                    type="radio"
                    class="form-check-input"
                    id="search_category_all"
                    name="search[category]"
                    value=""
                    :checked="'' === checked"
                    @change="setCategory('')"
                ><label class="form-check-label" for="search_category_all">all</label>
            </div>

            <div
                v-for="category in categories"
                :key="category.value"
                class="form-check form-check-inline gym-search-category"
            >
                <input
                    type="radio"
                    class="form-check-input"
                    :id="'search_category_' + category.value"
                    name="search[category]"
                    :value="category.value"
                    :checked="category.value === checked"
                    @change="setCategory(category.value)"
                ><label
                    class="form-check-label"
                    :for="'search_category_' + category.value"
                >{{ category.name }}</label>
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
            checked: {
                type: String,
                default: ''
            }
        },
        methods: {
            setCategory(value) {
                this.$emit('search:category', value);
            }
        }
    }
</script>

<style lang="scss">

</style>
