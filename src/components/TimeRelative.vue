<template>
    <time class="gym-time-relative" :datetime="renderDatetime">
        {{ renderLabel }}
    </time>
</template>


<script>
    import {TimeFormatter} from '@/domain/model/TimeFormatter'
    import {DurationFormatter} from "@/domain/model/DurationFormatter";

    export default {
        name: 'TimeRelative',
        props: {
            hour12: {
                type: Boolean,
                default: true
            },
            date: String,
            mode: {
                type: String,
                default: 'time',
                validator: function (value) {
                    return ['time', 'duration'].indexOf(value) !== -1
                }
            },
        },
        computed: {
            renderLabel() {
                if (this.mode === 'duration') {
                    return (new DurationFormatter(this.$store.getters.getDate)).format(this.getDate);
                }
                return (new TimeFormatter(this.$store.getters.isHour12)).format(this.getDate);
            },
            renderDatetime() {
                if (this.mode === 'duration') {
                    return (new DurationFormatter(this.$store.getters.getDate)).duration(this.getDate);
                }
                return this.getDate.toISOString();
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
