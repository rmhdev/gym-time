export { StatsRangeDay };

class StatsRangeDay {
    constructor(date) {
        let dateObject = new Date(date);
        dateObject.setHours(0, 0, 0);
        this.start = dateObject.toISOString();
        dateObject.setDate(dateObject.getDate() + 1);
        this.end = dateObject.toISOString();
    }
    from() {
        return new Date(this.start);
    }
    to() {
        return new Date(this.end);
    }
    inRange(datetime) {
        const date = new Date(datetime);

        return (this.from() <= date) && (date < this.to());
    }
}
