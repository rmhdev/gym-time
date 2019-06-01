<template>
    <time class="gym-time-relative text-nowrap" :datetime="renderDatetime">
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
            from: {
                type: String,
                default: ''
            },
            to: {
                type: String,
                default: ''
            },
            mode: {
                type: String,
                default: 'auto',
                validator: function (value) {
                    return ['auto', 'from', 'duration', 'date', 'time'].indexOf(value) !== -1
                }
            },
        },
        computed: {
            renderLabel() {
                if (this.getMode === 'duration') {
                    let fromDate = this.getFrom ? this.getFrom : this.$store.getters.getDate;
                    let toDate = this.getTo ? this.getTo : this.$store.getters.getDate;

                    return (new DurationFormatter(fromDate)).format(toDate);
                }
                if (this.getMode === 'from' && this.getFrom) {
                    return this.$store.getters.getTimeFormatter.format(this.getFrom);
                }
                if (this.getMode === 'date') {
                    return this.$store.getters.getDateFormatter.format(this.getDate);
                }

                return (new TimeFormatter(this.$store.getters.isHour12)).format(this.getDate);
            },
            renderDatetime() {
                if (this.getMode === 'duration') {
                    let fromDate = this.getFrom ? this.getFrom : this.$store.getters.getDate;
                    let toDate = this.getTo ? this.getTo : this.$store.getters.getDate;

                    return (new DurationFormatter(fromDate)).duration(toDate);
                }
                if (this.getMode === 'from' && this.getFrom) {
                    return this.getFrom.toISOString();
                }
                return this.getDate.toISOString();
            },
            getMode() {
                if ('auto' !== this.mode) {
                    return this.mode;
                }
                if (this.from && this.to) {
                    return 'duration';
                }
                if (this.from) {
                    return 'from';
                }
                return 'time';
            },
            getDate() {
                return this.$store.getters.getDate;
            },
            getFrom() {
                return (this.from !== '') ? new Date(this.from) : null;
            },
            getTo() {
                return (this.to !== '') ? new Date(this.to) : null;
            }
        }
    }
</script>


<style>
</style>
