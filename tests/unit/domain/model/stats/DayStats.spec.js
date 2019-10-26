import { expect } from 'chai'
import { DayStats } from "@/domain/model/stats/DayStats"
import { Stats } from "@/domain/model/stats/Stats";

describe('DayStats', () => {
    it('returns the start of the day', () => {
        const stats = new DayStats(new Date('2019-09-29T01:23:45'));

        expect(stats.from()).to.be.a('Date');
        expect(stats.from().toISOString()).eq(
            (new Date('2019-09-29T00:00:00')).toISOString(),
            'Stats: from date should be at midnight'
        );
    });

    it('returns the end of the day', () => {
        const stats = new DayStats(new Date('2019-09-29T01:23:45'));

        expect(stats.to()).to.be.a('Date');
        expect(stats.to().toISOString()).eq(
            (new Date('2019-09-30T00:00:00')).toISOString(),
            'Stats: end date should be at midnight of next day'
        );
    });

    it('returns empty stats fo a specific hour when no data is defined', () => {
        const stats = new DayStats(new Date('2019-09-29T01:23:45'));

        expect(stats.byHour(0)).to.eql(Stats.create());
    });

    it('returns stats for a specific hour', () => {
        const sameHourValues = [
            { 'date': '2019-09-29T00:00:00', 'checkIn': 3, 'checkOut': 1, 'category': 'category1' },
            { 'date': '2019-09-29T00:59:59', 'checkIn': 0, 'checkOut': 1, 'category': 'category2' },
        ];
        const stats = new DayStats(new Date('2019-09-29T12:00:00'), sameHourValues.concat(
            [{ 'date': '2019-09-29T01:23:45', 'checkIn': 1, 'checkOut': 4, 'category': 'category1' }]
        ));

        expect(stats.byHour(0)).to.eql(Stats.create(sameHourValues));
    });

    it('throws exception when passing unexpected hour values', () => {
        const stats = new DayStats(new Date('2019-09-29T12:00:00'));

        expect(() => { stats.byHour(24)}, 'Date only accepts hours between 0 and 23').to.throw(RangeError);
        expect(() => { stats.byHour(-1)}, 'Date does not accept negative hours').to.throw(RangeError);
        expect(() => { stats.byHour('hello')}, 'Incorrect hour value').to.throw(TypeError);
    });
});
