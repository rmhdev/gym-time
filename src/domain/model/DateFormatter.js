export { DateFormatter }

class DateFormatter {
    constructor(locales = '', options = null) {
        this.locales = locales || 'en';
        this.options = options || { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    }
    format(date) {
        return date.toLocaleDateString(this.locales, this.options);
    }
}
