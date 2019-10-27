import { expect } from 'chai'
import { StatsRangeMonth } from "@/domain/model/stats/StatsRangeMonth"

describe('StatsRangeMonth', () => {
    it('returns the "from" date as the 1st day of the month at midnight', () => {
        const stats = new StatsRangeMonth(new Date('2019-09-29T02:23:45'));

        expect(stats.from()).to.eql(new Date('2019-09-01T00:00:00'));
    });

    it('returns the "to" date as the first day of next month at midnight', () => {
        const stats = new StatsRangeMonth(new Date('2019-09-29T02:23:45'));

        expect(stats.to()).to.eql(new Date('2019-10-01T00:00:00'));
    });
});
