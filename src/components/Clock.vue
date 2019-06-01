<template>
    <section class="gym-clock">
        <h2 class="gym-clock-title">
            <time-relative mode="time" class="gym-clock-time"></time-relative>
        </h2>

        <time-relative mode="date" class="gym-clock-date"></time-relative>
    </section>
</template>


<script>
    import TimeRelative from '@/components/TimeRelative.vue'

    export default {
        name: 'Clock',
        components: {TimeRelative},
    }
</script>


<style>
</style>
