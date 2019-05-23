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
        expect(formatter.minutes(new Date('2019-01-01T00:00:59+0000')), 'from 00:00:00 to 00:00:59').eq(0);
        expect(formatter.minutes(new Date('2019-01-01T00:01:00+0000')), 'from 00:00:00 to 00:01:00').eq(1);
        expect(formatter.minutes(new Date('2019-01-01T00:02:59+0000')), 'from 00:00:00 to 00:02:59').eq(2);
        expect(formatter.minutes(new Date('2019-01-01T01:00:00+0000')), 'from 00:00:00 to 01:00:00').eq(60);
        expect(formatter.minutes(new Date('2019-01-02T00:00:00+0000')), '24 hours').eq(24 * 60);
        expect(formatter.minutes(new Date('2019-02-01T00:00:00+0000')), '1 month').eq(31 * 24 * 60);
        expect(formatter.minutes(new Date('2020-01-01T00:00:00+0000')), '1 year').eq(365 * 24 * 60);
        expect(formatter.minutes(new Date('2018-12-31T23:59:00+0000')), 'in the past').eq(-1);
    });

    it('renders the duration in hours', () => {
        let formatter = new DurationFormatter(new Date('2019-01-01T00:00:00+0000'));

        expect(formatter.hours(new Date('2019-01-01T00:00:00+0000')), 'same datetime').eq(0);
        expect(formatter.hours(new Date('2019-01-01T00:59:59+0000')), 'from 00:00:00 to 00:59:59').eq(0);
        expect(formatter.hours(new Date('2019-01-01T01:00:00+0000')), 'from 00:00:00 to 01:00:00').eq(1);
        expect(formatter.hours(new Date('2019-01-01T02:02:59+0000')), 'from 00:00:00 to 02:02:59').eq(2);
        expect(formatter.hours(new Date('2019-01-02T00:00:00+0000')), '24 hours').eq(24);
        expect(formatter.hours(new Date('2019-02-01T00:00:00+0000')), '1 month').eq(31 * 24);
        expect(formatter.hours(new Date('2020-01-01T00:00:00+0000')), '1 year').eq(365 * 24);
        expect(formatter.hours(new Date('2018-12-31T23:00:00+0000')), 'in the past').eq(-1);
    });

    it('renders the duration in days', () => {
        let formatter = new DurationFormatter(new Date('2019-01-01T00:00:00+0000'));

        expect(formatter.days(new Date('2019-01-01T00:00:00+0000')), 'same datetime').eq(0);
        expect(formatter.days(new Date('2019-01-01T23:59:59+0000')), 'from 00:00:00 to 23:59:59').eq(0);
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

    it('formats the duration automatically', () => {
        let formatter = new DurationFormatter(new Date('2019-01-01T00:00:00+0000'));

        expect(formatter.format(new Date('2019-01-01T00:00:00+0000')), 'same datetime').eq('0 secs');
        expect(formatter.format(new Date('2019-01-01T00:00:01+0000')), 'singular seconds').eq('1 sec');
        expect(formatter.format(new Date('2019-01-01T00:00:02+0000')), 'plural seconds').eq('2 secs');
        expect(formatter.format(new Date('2019-01-01T00:00:59+0000')), 'max seconds').eq('59 secs');
        expect(formatter.format(new Date('2019-01-01T00:01:00+0000')), 'singular min').eq('1 min');
        expect(formatter.format(new Date('2019-01-01T00:02:00+0000')), 'plural min').eq('2 min');
        expect(formatter.format(new Date('2019-01-01T00:02:15+0000')), 'min and sec').eq('2m 15s');
        expect(formatter.format(new Date('2019-01-01T00:59:59+0000')), 'max minutes').eq('59m 59s');
    });
});
