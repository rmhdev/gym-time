import { expect } from 'chai'
import { CustomerName } from "@/domain/model/customer/CustomerName";
import { CustomerNameTooLongException } from "@/domain/model/customer/CustomerNameTooLongException";
import { CustomerNameEmptyException } from "@/domain/model/customer/CustomerNameEmptyException";

describe('CustomerName', () => {
    it('throws exception if no name is defined', () => {
        expect(function () {
            return CustomerName.create('');
        }).to.throw(CustomerNameEmptyException);
    });
    it('throws exception if name has empty spaces', () => {
        expect(function () {
            return CustomerName.create('  ');
        }).to.throw(CustomerNameEmptyException);
    });
    it('throws exception if name is not a string', () => {
        expect(function () {
            return CustomerName.create(new Date());
        }).to.throw(TypeError);
    });
    it('returns the defined name, trimmed', () => {
        expect(CustomerName.create(' Name Surname  ').value).to.equal('Name Surname');
    });
    it('throws exception when name is too long', () => {
        expect(function () {
            return CustomerName.create('a'.repeat(255));
        }).to.throw(CustomerNameTooLongException);
    });
    it('accepts long names', () => {
        const maxLongName = 'b'.repeat(254);
        expect(CustomerName.create(maxLongName)).to.be.instanceOf(CustomerName);
        expect(
            CustomerName.create(' ' + maxLongName + ' '),
            'left and right padding should be ignored'
        ).to.be.instanceOf(CustomerName);
    });
    it('returns the initials', () => {
        expect(CustomerName.create('Name Surname').initials()).to.equal('N');
        expect(CustomerName.create('name Other').initials(), 'Initials mus be always uppercase').to.equal('N');
        expect(CustomerName.create('名称').initials(), 'Initials in Chinese').to.equal('名');
        expect(CustomerName.create('😀 Hi!').initials(), 'Initials in emoticons').to.equal('😀');
    });
});
