import { expect } from 'chai'
import { StatsRangeLast24Hours } from "@/domain/model/stats/StatsRangeLast24Hours"

describe('StatsRangeLast24Hours', () => {
    it('returns the "from" date', () => {
        const stats = new StatsRangeLast24Hours(new Date('2019-09-29T02:23:45'));

        expect(stats.from()).to.eql(
            new Date('2019-09-28T02:00:00'),
            'Stats range, last 24 hours: "from" date should be 24 before the defined datetime'
        );
    });

    it('returns the "to" date', () => {
        const stats = new StatsRangeLast24Hours(new Date('2019-09-29T02:23:45'));

        expect(stats.to()).to.eql(
            new Date('2019-09-29T03:00:00'),
            'Stats range, last 24 hours: "to" date should be the current hour +1, sharp'
        );
    });
});
