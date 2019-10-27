export { StatsRangeMonth };

class StatsRangeMonth {
    constructor(date) {
        let dateObject = new Date(date);
        dateObject.setDate(1);
        dateObject.setHours(0, 0, 0);
        this.start = dateObject.toISOString();
        dateObject.setMonth(dateObject.getMonth() + 1);
        this.end = dateObject.toISOString();
    }
    from() {
        return new Date(this.start);
    }
    to() {
        return new Date(this.end);
    }
}
