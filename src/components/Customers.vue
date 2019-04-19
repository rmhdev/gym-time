<template>
    <div id="customers">
        <div class="list-group customers">
            <a
                href="#"
                class="list-group-item list-group-item-action customer"
                v-for="customer in customers"
                :key="customer.id.value"
            >
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{ customer.name.value }}</h5>
                    <time :datetime="customer.checkIn().toISOString()">hi</time>
                </div>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Customers',
        computed: {
            customers() {
                return this.$store.getters.getRepository.all();
            }
        }
    }
</script>

<style lang="scss">

</style>
