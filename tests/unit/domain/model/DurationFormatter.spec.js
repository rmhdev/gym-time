import { expect } from 'chai'
import { DurationFormatter } from '@/domain/model/DurationFormatter'

describe('DurationFormatter', () => {
    it('renders the duration in seconds', () => {
        let formatter = new DurationFormatter(new Date('2019-01-01T00:00:00+0000'));

        expect(formatter.seconds(new Date('2019-01-01T00:00:00+0000')), 'same datetime').eq(0);
        expect(formatter.seconds(new Date('2019-01-01T00:00:01+0000')), 'from 00:00:00 to 00:00:01').eq(1);
        expect(formatter.seconds(new Date('2019-01-01T00:01:00+0000')), 'from 00:00:00 to 00:01:00').eq(60);
        expect(formatter.seconds(new Date('2019-01-01T00:02:59+0000')), 'from 00:00:00 to 00:02:59').eq(179);
        expect(formatter.seconds(new Date('2019-01-01T01:00:00+0000')), 'from 00:00:00 to 01:00:00').eq(3600);
        expect(formatter.seconds(new Date('2019-01-02T00:00:00+0000')), '24 hours').eq(24 * 60 * 60);
        expect(formatter.seconds(new Date('2019-02-01T00:00:00+0000')), '1 month').eq(31 * 24 * 60 * 60);
        expect(formatter.seconds(new Date('2020-01-01T00:00:00+0000')), '1 year').eq(365 * 24 * 60 * 60);
        expect(formatter.seconds(new Date('2018-12-31T23:59:59+0000')), 'in the past').eq(-1);
    });
    it('renders the duration in minutes', () => {
        let formatter = new DurationFormatter(new Date('2019-01-01T00:00:00+0000'));

        expect(formatter.minutes(new Date('2019-01-01T00:00:00+0000')), 'same datetime').eq(0);
        expect(formatter.minutes(new Date('2019-01-01T00:00:30+0000')), 'from 00:00:00 to 00:00:30').eq(0.5);
        expect(formatter.minutes(new Date('2019-01-01T00:01:00+0000')), 'from 00:00:00 to 00:01:00').eq(1);
        expect(formatter.minutes(new Date('2019-01-01T00:02:45+0000')), 'from 00:00:00 to 00:02:45').eq(2.75);
        expect(formatter.minutes(new Date('2019-01-01T01:00:00+0000')), 'from 00:00:00 to 01:00:00').eq(60);
        expect(formatter.minutes(new Date('2019-01-02T00:00:00+0000')), '24 hours').eq(24 * 60);
        expect(formatter.minutes(new Date('2019-02-01T00:00:00+0000')), '1 month').eq(31 * 24 * 60);
        expect(formatter.minutes(new Date('2020-01-01T00:00:00+0000')), '1 year').eq(365 * 24 * 60);
        expect(formatter.minutes(new Date('2018-12-31T23:59:00+0000')), 'in the past').eq(-1);
    });

    it('renders the duration in hours', () => {
        let formatter = new DurationFormatter(new Date('2019-01-01T00:00:00+0000'));

        expect(formatter.hours(new Date('2019-01-01T00:00:00+0000')), 'same datetime').eq(0);
        expect(formatter.hours(new Date('2019-01-01T00:30:00+0000')), 'from 00:00:00 to 00:30:00').eq(0.5);
        expect(formatter.hours(new Date('2019-01-01T01:00:00+0000')), 'from 00:00:00 to 01:00:00').eq(1);
        expect(formatter.hours(new Date('2019-01-01T02:45:00+0000')), 'from 00:00:00 to 02:45:00').eq(2.75);
        expect(formatter.hours(new Date('2019-01-02T00:00:00+0000')), '24 hours').eq(24);
        expect(formatter.hours(new Date('2019-02-01T00:00:00+0000')), '1 month').eq(31 * 24);
        expect(formatter.hours(new Date('2020-01-01T00:00:00+0000')), '1 year').eq(365 * 24);
        expect(formatter.hours(new Date('2018-12-31T23:00:00+0000')), 'in the past').eq(-1);
    });

    it('renders the duration in days', () => {
        let formatter = new DurationFormatter(new Date('2019-01-01T00:00:00+0000'));

        expect(formatter.days(new Date('2019-01-01T00:00:00+0000')), 'same datetime').eq(0);
        expect(formatter.days(new Date('2019-01-01T12:00:00+0000')), 'from 00:00:00 to 12:00:00').eq(0.5);
        expect(formatter.days(new Date('2019-01-02T00:00:00+0000')), '24 hours').eq(1);
        expect(formatter.days(new Date('2019-02-01T00:00:00+0000')), '1 month').eq(31);
        expect(formatter.days(new Date('2020-01-01T00:00:00+0000')), '1 year').eq(365);
        expect(formatter.days(new Date('2018-12-31T00:00:00+0000')), 'in the past').eq(-1);
    });

    it('accepts strings and integers as dates', () => {
        let formatterA = new DurationFormatter('2019-01-01T00:00:00+0000');
        expect(formatterA.seconds('2019-01-01T00:00:30+0000'), 'string date').eq(30);

        let formatterB = new DurationFormatter(1546300800000);
        expect(formatterB.seconds(1546300830000), 'int date').eq(30);
    });

    it('throws exception when incorrect date is given', () => {
        const incorrectDate = new DurationFormatter('2019-01-01T00:00:00+0000');
        expect(() => new DurationFormatter(incorrectDate)).to.throw(RangeError);
    });

    it('return a json with the duration', () => {
        let formatter = new DurationFormatter(new Date('2019-01-01T00:00:00+0000'));

        formatDataProvider().forEach((data) => {
            expect(formatter.toJSON(new Date(data.date)), data.comment).to.eql(data.expected.json);
        });
    });

    it('formats the duration automatically', () => {
        let formatter = new DurationFormatter(new Date('2019-01-01T00:00:00+0000'));

        formatDataProvider().forEach((data) => {
            expect(formatter.format(new Date(data.date)), data.comment).eq(data.expected.format);
        });
    });

    it('formats the duration in ISO 8601 format', () => {
        let formatter = new DurationFormatter(new Date('2019-01-01T00:00:00+0000'));

        formatDataProvider().forEach((data) => {
            expect(formatter.duration(new Date(data.date)), data.comment).eq(data.expected.duration);
        });
    });

    function formatDataProvider() {
        return [
            {
                date: '2019-01-01T00:00:00+0000',
                comment: 'same datetime',
                expected: {
                    format: '0 seconds',
                    json: { seconds: 0 },
                    duration: 'PT0S'
                }
            },
            {
                date: '2019-01-01T00:00:01+0000',
                comment: 'singular seconds',
                expected: {
                    format: '1 second',
                    json: { seconds: 1 },
                    duration: 'PT1S'
                }
            },
            {
                date: '2019-01-01T00:00:02+0000',
                comment: 'plural seconds',
                expected: {
                    format: '2 seconds',
                    json: { seconds: 2 },
                    duration: 'PT2S'
                }
            },
            {
                date: '2019-01-01T00:00:59+0000',
                comment: 'max seconds',
                expected: {
                    format: '59 seconds',
                    json: { seconds: 59 },
                    duration: 'PT59S'
                }
            },
            {
                date: '2019-01-01T00:00:01.1+0000',
                comment: 'seconds with decimal',
                expected: {
                    format: '1 second',
                    json: { seconds: 1 },
                    duration: 'PT1S'
                }
            },

            {
                date: '2019-01-01T00:01:00+0000',
                comment: 'singular min',
                expected: {
                    format: '1 minute',
                    json: { minutes: 1 },
                    duration: 'PT1M'
                }
            },
            {
                date: '2019-01-01T00:02:00+0000',
                comment: 'plural min',
                expected: {
                    format: '2 minutes',
                    json: { minutes: 2 },
                    duration: 'PT2M'
                }
            },
            {
                date: '2019-01-01T00:02:15+0000',
                comment: 'minutes and seconds',
                expected: {
                    format: '2m 15s',
                    json: { minutes: 2, seconds: 15 },
                    duration: 'PT2M15S'
                }
            },
            {
                date: '2019-01-01T00:59:59+0000',
                comment: 'max minutes',
                expected: {
                    format: '59m 59s',
                    json: { minutes: 59, seconds: 59 },
                    duration: 'PT59M59S'
                }
            },

            {
                date: '2019-01-01T01:00:00+0000',
                comment: 'singular hour',
                expected: {
                    format: '1 hour',
                    json: { hours: 1 },
                    duration: 'PT1H'
                }
            },
            {
                date: '2019-01-01T02:00:00+0000',
                comment: 'plural hour',
                expected: {
                    format: '2 hours',
                    json: { hours: 2 },
                    duration: 'PT2H'
                }
            },
            {
                date: '2019-01-01T02:15:00+0000',
                comment: 'hours and minutes',
                expected: {
                    format: '2h 15m',
                    json: { hours: 2, minutes: 15 },
                    duration: 'PT2H15M'
                }
            },
            {
                date: '2019-01-01T02:15:59+0000',
                comment: 'hours, minutes and seconds',
                expected: {
                    format: '2h 15m 59s',
                    json: { hours: 2, minutes: 15, seconds: 59 },
                    duration: 'PT2H15M59S'
                }
            },
            {
                date: '2019-01-01T23:59:59+0000',
                comment: 'max hours',
                expected: {
                    format: '23h 59m 59s',
                    json: { hours: 23, minutes: 59, seconds: 59 },
                    duration: 'PT23H59M59S'
                }
            },

            {
                date: '2019-01-02T00:00:00+0000',
                comment: 'singular day',
                expected: {
                    format: '1 day',
                    json: { days: 1 },
                    duration: 'P1D'
                }
            },
            {
                date: '2019-01-03T00:00:00+0000',
                comment: 'plural days',
                expected: {
                    format: '2 days',
                    json: { days: 2 },
                    duration: 'P2D'
                }
            },
            {
                date: '2019-01-02T12:00:00+0000',
                comment: 'days and hours',
                expected: {
                    format: '1d 12h',
                    json: { days: 1, hours: 12 },
                    duration: 'P1DT12H'
                }
            },
            {
                date: '2019-01-03T12:30:00+0000',
                comment: 'days, hours and minutes',
                expected: {
                    format: '2d 12h 30m',
                    json: { days: 2, hours: 12, minutes: 30 },
                    duration: 'P2DT12H30M'
                }
            },
            {
                date: '2019-01-03T12:30:45+0000',
                comment: 'days, hours, minutes and seconds',
                expected: {
                    format: '2d 12h 30m 45s',
                    json: { days: 2, hours: 12, minutes: 30, seconds: 45 },
                    duration: 'P2DT12H30M45S'
                }
            },
        ];
    }
});
