import {StatsSummary} from "./StatsSummary";

export { Stats };

class Stats {
    constructor(statsRange, values = []) {
        this.statsRange = statsRange;
        this.values = values;
    }
    byHour(hour) {
        if (typeof hour !== 'number') {
            throw new TypeError('Parameter `hour`: received "' + (typeof hour) + '", expected a number');
        }
        if (0 > hour || hour >= 24) {
            throw new RangeError('Parameter `hour`: received "' + hour + '", expected value in [0..23] range')
        }
        let from = this.statsRange.from();
        from.setHours(hour, 0, 0, 0);
        let to = this.statsRange.from();
        to.setHours(hour + 1, 0, 0, 0);

        return StatsSummary.create(this.values.filter(function (entry) {
            const date = new Date(entry.date);

            return (from <= date) && (date < to);
        }));
    }
}
