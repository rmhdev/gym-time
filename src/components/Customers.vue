<template>
    <div id="customers">
        <div class="list-group gym-customers">
            <div v-if="isEmpty" class="gym-empty alert alert-info text-center" role="alert">
                <h4 class="gym-title alert-heading">Gym is empty!</h4>
                <p>Looks like you'll be the first one!</p>
            </div>

            <a
                v-else
                href="#"
                class="gym-customer list-group-item list-group-item-action"
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
            },
            isEmpty() {
                return this.$store.getters.getRepository.count() === 0;
            }
        }
    }
</script>

<style lang="scss">

</style>
