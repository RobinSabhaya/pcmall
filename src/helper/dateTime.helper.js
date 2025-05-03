const moment = require('moment');

/**
 * Suffix UTC date and time
 * @param {import('moment').MomentInput} date
 * @param {import('moment/moment').DurationInputArg1} amount
 * @param {import('moment/moment').DurationInputArg2} unit
 * @returns {import('moment').Moment}
 */
exports.suffixUtcDateAndTime = (date, amount = 0, unit = 'second') => {
    return moment(date).utc().add(amount, unit);
};

/**
 * Set date and hour and addDays
 * @param {Date} date
 * @param {number} hours
 * @param {number} minutes
 * @param {number} seconds
 * @param {number} addDays
 * @returns {Date}
 */
exports.setDateAndHMS = (date, hours = 0, minutes = 0, seconds = 0, addDays = 0) => {
    date.setHours(hours, minutes, seconds, 0);
    date.setDate(date.getDate() + addDays);

    return date;
};

/**
 * Change date formate
 * @param {Date} date
 * @returns {String}
 */
exports.changeDateFormate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
};

/**
 * Formate time as AM and PM formate
 * @param {*} dateString
 * @returns
 */
exports.formatTime = (dateString) =>
    moment(new Date(dateString)).utcOffset('+05:30').format('hh:mm A');
