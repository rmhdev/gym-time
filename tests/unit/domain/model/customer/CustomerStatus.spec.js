import { expect } from 'chai'
import { CustomerStatus } from "@/domain/model/customer/CustomerStatus";

describe('CustomerStatus', () => {
    it('has active as default status', () => {
        const status = new CustomerStatus();
        expect(status.value).eq('active');
    });
    it('creates a status with a custom value', () => {
        const status = new CustomerStatus('hello');
        expect(status.value).eq('hello');
    });
    it('throws exception if value is incorrect', () => {
        expect(function () {
            return new CustomerStatus(new Date());
        }).to.throw(TypeError);
    });
    it('creates a status from another CustomerStatus', () => {
        const status = new CustomerStatus(new CustomerStatus('two'));
        expect(status.value).eq('two');
    });
    it('formats the value if the received status', () => {
        const statusA = new CustomerStatus('  spaced ');
        expect(statusA.value, 'Spaces should be trimmed').eq('spaced');

        const statusB = new CustomerStatus(' oThER_sTatus  ');
        expect(statusB.value, 'value should be lowercase').eq('other_status');
    });
    it('checks equality with other status', () => {
        const statusA = new CustomerStatus('one');
        expect(statusA.equals('one'), 'Status string is equal').eq(true);

        const statusB = new CustomerStatus('two');
        expect(statusB.equals('dos'), 'Status string not equal').eq(false);

        const statusC = new CustomerStatus('three');
        expect(statusC.equals(' THREE  '), 'Non formatted status string is equal').eq(true);

        const statusD = new CustomerStatus('four');
        expect(statusD.equals(statusD), 'Equals CustomerStatus object').eq(true);

        const statusE = new CustomerStatus('five');
        expect(statusE.equals(new Date()), 'Equals incorrect status should return false').eq(false);
    });
    it('returns a static list of all available status', () => {
        const expectedValues = ['active', 'out', 'deleted'];
        expect(CustomerStatus.all().length, 'Number of available status').eq(expectedValues.length);

        CustomerStatus.all().forEach(function (status) {
            expect(
                expectedValues.indexOf(status.value),
                'Defined status `' + status.value + '` must exist in all()'
            ).not.eq(-1);
        });
    });
});
