import { expect } from 'chai'
import { DateFormatter } from '@/domain/model/DateFormatter'

describe('DateFormatter', () => {
    it('renders the date by default', () => {
        const date = new Date('2019-03-16T01:23:45');
        let formatter = new DateFormatter();

        expect(formatter.format(date)).eq('Saturday, 16 march 2019')
    });
});
