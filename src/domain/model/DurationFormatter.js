export { DurationFormatter }

class DurationFormatter {
    constructor(date) {
        this.datetime = (new Date(date)).toISOString();
    }
    getDate() {
        return new Date(this.datetime);
    }
    seconds(date) {
        return  Math.round((new Date(date) - this.getDate()) / 1000);
    }
    minutes(date) {
        return this.seconds(date) / 60;
    }
    hours(date) {
        return this.minutes(date) / 60;
    }
    days(date) {
        return this.hours(date) / 24;
    }
    toJSON(date) {
        let json = {};
        let count = 0;
        const days = Math.floor(this.days(date));
        if (days > 0) {
            json['days'] = days;
            count++;
        }
        const hours = Math.floor(this.hours(date)) % 24;
        if (hours > 0) {
            json['hours'] = hours;
            count++;
        }
        const minutes = Math.floor(this.minutes(date)) % 60;
        if (minutes > 0) {
            json['minutes'] = minutes;
            count++;
        }
        const seconds = this.seconds(date) % 60;
        if (seconds > 0) {
            json['seconds'] = seconds;
            count++;
        }
        if (count === 0) {
            return { 'seconds': 0 };
        }

        return json;
    }
    format(date) {
        const json = this.toJSON(date);
        let parts = [];
        ['days', 'hours', 'minutes', 'seconds'].forEach((unit) => {
            if (undefined !== json[unit]) {
                parts.push(json[unit] + ' ' + (json[unit] === 1 ? unit.substring(0, unit.length - 1) : unit));
            }
        });
        let isShort = parts.length > 1;

        return parts.map((unit) => {
            let unitParts = unit.split(' ');
            return unitParts[0] + (isShort ? unitParts[1].substring(0, 1) : ' ' + unitParts[1]);
        }).join(' ');
    }
    duration(date) {
        const json = this.toJSON(date);
        let durationDate = [];
        if (json.days !== undefined) {
            durationDate.push(json.days + 'D');
        }
        let durationTime = [];
        if (json.hours !== undefined) {
            durationTime.push(json.hours + 'H');
        }
        if (json.minutes !== undefined) {
            durationTime.push(json.minutes + 'M');
        }
        if (json.seconds !== undefined) {
            durationTime.push(json.seconds + 'S');
        }

        return 'P'
            + durationDate.join('')
            + (durationTime.length > 0 ? 'T' : '')
            + durationTime.join('')
        ;
    }
}
