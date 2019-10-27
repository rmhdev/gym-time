export { StatsRangeLast24Hours };

class StatsRangeLast24Hours {
    constructor(date) {
        let dateObject = new Date(date);
        dateObject.setHours(dateObject.getHours() - 24, 0, 0);
        this.start = dateObject.toISOString();
        dateObject.setHours(dateObject.getHours() + 25, 0, 0);
        this.end = dateObject.toISOString();
    }
    from() {
        return new Date(this.start);
    }
    to() {
        return new Date(this.end);
    }
}
