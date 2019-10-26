import {Stats} from "./Stats";

export { DayStats };

class DayStats {
    constructor(date, values = []) {
        let dateObject = new Date(date);
        dateObject.setHours(0, 0, 0);
        this.start = dateObject.toISOString();
        dateObject.setDate(dateObject.getDate() + 1);
        this.end = dateObject.toISOString();
        this.values = values;
    }
    from() {
        return new Date(this.start);
    }
    to() {
        return new Date(this.end);
    }
    byHour(hour) {
        if (typeof hour !== 'number') {
            throw new TypeError('Parameter `hour`: received "' + (typeof hour) + '", expected a number');
        }
        if (0 > hour || hour >= 24) {
            throw new RangeError('Parameter `hour`: received "' + hour + '", expected value in [0..23] range')
        }
        let from = this.from();
        from.setHours(hour, 0, 0, 0);
        let to = this.from();
        to.setHours(hour + 1, 0, 0, 0);

        return Stats.create(this.values.filter(function (entry) {
            const date = new Date(entry.date);

            return (from <= date) && (date < to);
        }));
    }
}
