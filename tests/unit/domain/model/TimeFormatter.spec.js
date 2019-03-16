import { expect } from 'chai'
import { TimeFormatter } from '@/domain/model/TimeFormatter'

describe('TimeFormatter', () => {
    it('renders the time in AM/PM format by default', () => {
        const date = new Date('2019-03-16T01:23:45');
        let formatter = new TimeFormatter();

        expect(formatter.format(date)).eq('1:23 AM')
    });
    it('renders the time in 24H when defined', () => {
        const date = new Date('2019-03-16T01:23:45');
        let formatter = new TimeFormatter(true);

        expect(formatter.format(date)).eq('01:23')
    });
});
