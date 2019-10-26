import { expect } from 'chai'
import { Stats } from "@/domain/model/stats/Stats"

describe('Stats', () => {
    it('returns zero when no data is defined', () => {
        let stats = new Stats();

        expect(stats.checkIns()).eq(0);
        expect(stats.checkOuts()).eq(0);
        expect(stats.categories()).to.eql([]);
    });

    it('returns values when data is defined', () => {
        let stats = new Stats({
            'checkIn': 4,
            'checkOut': 6,
            'byCategory': {
                'category1': {
                    'checkIn': 1,
                    'checkOut': 2,
                },
                'category2': {
                    'checkIn': 3,
                    'checkOut': 4,
                },
            }
        });

        expect(stats.checkIns(), 'Total of checkIns').eq(4);
        expect(stats.checkOuts(), 'Total of checkOuts').eq(6);
        expect(stats.categories(), 'List of category slugs').to.eql(['category1', 'category2']);
        expect(stats.checkIns('category1'), 'CheckIns by category "category1"').eq(1);
        expect(stats.checkOuts('category2'), 'CheckOuts by category "category2"').eq(4);
        expect(stats.checkOuts('lorem'), 'CheckIns by unknown category').eq(0);
    });

    it('allows being created based on raw data', () => {
        const stats = Stats.create([
            { 'date': '2019-09-29T00:00:00', 'checkIn': 3, 'checkOut': 2, 'category': 'categoryA' },
            { 'date': '2019-09-29T00:00:00', 'checkIn': 1, 'checkOut': 3, 'category': 'categoryB' },
            { 'date': '2019-09-29T01:23:45', 'checkIn': 4, 'checkOut': 1, 'category': 'categoryA' },
        ]);

        expect(stats.checkIns(), 'Total checkIns from raw data').eq(8);
        expect(stats.checkOuts(), 'Total checkOuts from raw data').eq(6);
        expect(stats.categories(), 'List of category slugs').to.eql(['categoryA', 'categoryB']);
        expect(stats.checkIns('categoryA'), 'CheckIns from raw data by category "categoryA"').eq(7);
        expect(stats.checkOuts('categoryB'), 'CheckOuts from raw data by category "categoryB"').eq(3);
    });
});
