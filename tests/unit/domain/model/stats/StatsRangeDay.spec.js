import { expect } from 'chai'
import { StatsRangeDay } from "@/domain/model/stats/StatsRangeDay"

describe('StatsDayRange', () => {
    it('returns the start of the day', () => {
        const stats = new StatsRangeDay(new Date('2019-09-29T01:23:45'));

        expect(stats.from()).to.eql(
            new Date('2019-09-29T00:00:00'),
            'Stats day range: "from" date should be at midnight'
        );
    });

    it('returns the end of the day', () => {
        const stats = new StatsRangeDay(new Date('2019-09-29T01:23:45'));

        expect(stats.to()).to.eql(
            new Date('2019-09-30T00:00:00'),
            'Stats day range: "to" date should be at midnight of next day'
        );
    });

    it('checks if a date is inside the range', () => {
        const day = '2019-09-29';
        const stats = new StatsRangeDay(new Date(day + 'T01:23:45'));
        const values = [
            { 'datetime': '2019-09-29T00:00:00', 'expected': true },
            { 'datetime': '2019-09-29T23:59:59', 'expected': true },
            { 'datetime': '2019-09-30T00:00:00', 'expected': false },
            { 'datetime': '2019-09-28T23:59:59', 'expected': false },
        ];

        values.map(function (value) {
            expect(stats.inRange(new Date(value.datetime))).eq(
                value.expected,
                'Stats day range: date "' + + '" should ' + (value.expected ? 'be' : 'not be') + ' in "' + day +  '"'
            );
        });
    });
});
