export { TimeFormatter }

class TimeFormatter {
    constructor(hour12 = true, locales = '') {
        this.locales = locales || 'en';
        this.hour12 = hour12;
    }
    format(date) {
        if (this.hour12) {
            return date.toLocaleTimeString(this.locales, { 'hour12': this.hour12 }).replace(/:\d{2}\s/,' ');
        }
        return date.toLocaleTimeString(this.locales, { 'hour12': this.hour12, hour: '2-digit', minute: '2-digit', second: undefined });
    }
}
