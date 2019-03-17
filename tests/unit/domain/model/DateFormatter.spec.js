import { expect } from 'chai'
import { DateFormatter } from '@/domain/model/DateFormatter'

describe('DateFormatter', () => {
    it('renders the date by default', () => {
        const date = new Date('2019-03-16T01:23:45');
        let formatter = new DateFormatter();

        expect(formatter.format(date)).eq('Saturday, March 16, 2019')
    });
    it('renders the date in Spanish', () => {
        const date = new Date('2019-03-16T01:23:45');
        let formatter = new DateFormatter('es');

        expect(formatter.format(date)).eq('sábado, 16 de marzo de 2019')
    });
});
