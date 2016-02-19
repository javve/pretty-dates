var moment = require('moment-timezone');

var sameMonth =  function(start, end) {
  return end.month() === start.month();
};

var sameDayOrNight = function(start, end) {
  return (end.day() === start.day() || ((end.diff(start, 'hours') < 24) && end.hours() < 8));
};

module.exports = function({endDate, startDate, timeZone, timeFormat, locale}) {
  if (!timeZone) { timeZone = 'Europe/Stockholm'; }
  if (!timeFormat) { timeFormat = '24'; }
  if (!locale) { locale = 'en'; }
  var start = moment(startDate).locale(locale).tz(timeZone);
  if (endDate) {
    var end = moment(endDate).locale(locale).tz(timeZone);
    if (sameMonth(start, end)) {
      if (sameDayOrNight(start, end)) {
        if (timeFormat && timeFormat === '12') {
          return start.format('D MMM hh:mm A') + ' - ' + end.format('hh:mm A');
        } else {
          return start.format('D MMM HH:mm') + ' - ' + end.format('HH:mm');
        }
      } else {
        return start.format('D') + ' - ' + end.format('D MMM');
      }
    } else {
      return start.format('D MMM') + ' - ' + end.format('D MMM');
    }
  } else {
    if (timeFormat && timeFormat === '12') {
      return start.format('D MMM hh:mm A');
    } else {
      return start.format('D MMM HH:mm');
    }
  }
};
