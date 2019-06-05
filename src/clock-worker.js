/**
 * Web worker that sends the new datetime every given seconds
 */

(function () {

    const UPDATE_EVERY_SECONDS = 60;

    let timeout = null;
    let interval = null;

    /**
     * Update datetime when seconds reach 0
     *
     * @param callback
     */
    let updateFirstTime = (callback) => {
        let secondsToZero = 0;
        let compareTo = UPDATE_EVERY_SECONDS >= 60 ? 0 : UPDATE_EVERY_SECONDS;
        let now = new Date();
        if (now.getSeconds() !== compareTo) {
            secondsToZero = UPDATE_EVERY_SECONDS - (now.getSeconds() % (UPDATE_EVERY_SECONDS));
        }
        stop();
        timeout = setTimeout(function() {
            sendNewDatetime();
            if (callback && typeof(callback) === 'function') {
                callback();
            }
        }, Math.max(secondsToZero, 1) * 1000)
    };

    /**
     * Update datetime every X seconds
     */
    let updateManyTimes = () => {
        stop();
        interval = setInterval(() => {
            sendNewDatetime();
        }, UPDATE_EVERY_SECONDS * 1000);
    };

    /**
     * Send message with new datetime
     */
    let sendNewDatetime = () => {
        postMessage((new Date()).toISOString());
    };

    let start = () => {
        stop();
        updateFirstTime(updateManyTimes);
    };

    let stop = () => {
        if (timeout) {
            clearTimeout(timeout);
        }
        if (interval) {
            clearInterval(interval);
        }
    };

    onmessage = function(event) {
        if (event.data === undefined ) {
            return;
        }
        if (event.data[0] === undefined) {
            return;
        }
        if (event.data[0] !== 'action') {
            return;
        }
        if (event.data[1] === undefined) {
            return;
        }
        if ('start' === event.data[1]) {
            start();
            return;
        }
        stop();
    };
})();
