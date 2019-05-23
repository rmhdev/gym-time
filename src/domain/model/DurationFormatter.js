export { DurationFormatter }

class DurationFormatter {
    constructor(date) {
        this.datetime = (new Date(date)).toISOString();
    }
    getDate() {
        return new Date(this.datetime);
    }
    seconds(date) {
        return (new Date(date) - this.getDate()) / 1000;
    }
    minutes(date) {
        return Math.floor(this.seconds(date) / 60);
    }
    hours(date) {
        return Math.floor(this.minutes(date) / 60);
    }
    days(date) {
        return Math.floor(this.hours(date) / 24);
    }
    format(date) {
        return this.seconds(date) + ' sec' + (Math.abs(this.seconds(date)) === 1 ? '' : 's');
    }
}
