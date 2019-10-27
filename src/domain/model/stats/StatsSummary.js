export { StatsSummary };

class StatsSummary {
    constructor(totals = {}) {
        this.totals = totals;
    }
    checkIns(category = null) {
        let totals = Object.assign({'checkIn': 0, 'byCategory': {}}, this.totals);
        if (null !== category) {
            totals = (typeof totals.byCategory[category] === 'undefined')
                ? { 'checkIn': 0 }
                : totals.byCategory[category]
            ;
        }

        return totals.checkIn;
    }
    checkOuts(category = null) {
        let totals = Object.assign({'checkOut': 0, 'byCategory': {}}, this.totals);
        if (null !== category) {
            totals = (typeof totals.byCategory[category] === 'undefined')
                ? { 'checkOut': 0 }
                : totals.byCategory[category]
            ;
        }

        return totals.checkOut;
    }
    categories() {
        if (typeof this.totals.byCategory === 'undefined') {
            return [];
        }

        return Object.keys(this.totals.byCategory);
    }
    static create(values = []) {
        let totals = {
            'checkIn': 0,
            'checkOut': 0,
            'byCategory': {}
        };
        for (let i = 0; i < values.length; i++) {
            let checkIn = values[i].checkIn;
            let checkOut = values[i].checkOut;
            let category = values[i].category;
            if (typeof totals.byCategory[category] === 'undefined') {
                totals.byCategory[category] = {
                    'checkIn': 0,
                    'checkOut': 0
                }
            }
            totals.checkIn += checkIn;
            totals.checkOut += checkOut;
            totals.byCategory[category].checkIn += checkIn;
            totals.byCategory[category].checkOut += checkOut;
        }

        return new StatsSummary(totals);
    }
}
