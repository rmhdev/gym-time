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
    it('removes extra spaces', () => {
        expect(CustomerName.create(' Lorem   Ipsum ').value).to.equal('Lorem Ipsum');
        expect(CustomerName.create(' Lorem  \n\t Ipsum ').value, 'Other whitespaces').to.equal('Lorem Ipsum');
    });
    it('removes specials chars', () => {
        expect(
            CustomerName.create('-_*(¡!@#$%^&*()_-={}[]:\\"<>,.¿?/~´` Hello').value,
            'Basic chars from the keyboard'
        ).to.equal('Hello');
    });
    it('returns the initials', () => {
        expect(CustomerName.create('Name Surname').initials()).to.equal('N');
        expect(CustomerName.create('name Other').initials(), 'Initials mus be always uppercase').to.equal('N');
        expect(CustomerName.create('名称').initials(), 'Initials in Chinese').to.equal('名');
        expect(CustomerName.create('😀 Hi!').initials(), 'Initials in emoticons').to.equal('😀');
    });
    it('checks if a name is similar', () => {
        const name = CustomerName.create('Name Surname');

        expect(name.isSimilar('Name Surname'), 'Same name').to.equal(true);
        expect(name.isSimilar(''), 'Empty value').to.equal(false);
        expect(name.isSimilar('name surname'), 'Same name but different case').to.equal(true);
        expect(name.isSimilar('Ms Unknown'), 'Different name').to.equal(false);
        expect(name.isSimilar('NAME'), 'First part similar').to.equal(true);
        expect(name.isSimilar('SuRNamE'), 'Last part similar').to.equal(true);
        expect(name.isSimilar('  name  '), 'First part with extra spaces').to.equal(true);
        expect(name.isSimilar(new Date()), 'Incorrect name type').to.equal(false);
    });
});
