<template>
    <time class="gym-time-relative">
        {{ renderTime }}
    </time>
</template>


<script>
    import {TimeFormatter} from '@/domain/model/TimeFormatter'

    export default {
        name: 'TimeRelative',
        props: {
            hour12: {
                type: Boolean,
                default: true
            },
            date: String
        },
        computed: {
            renderTime() {
                return (new TimeFormatter(this.$store.getters.isHour12)).format(
                    this.getDate
                );
            },
            getDate() {
                if (this.date !== undefined && this.date !== '') {
                    return new Date(this.date);
                }
                return this.$store.getters.getDate;
            }
        }
    }
</script>


<style>
</style>
