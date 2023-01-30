/* eslint-disable no-restricted-syntax */
const moment = require('moment-timezone');
const twilio = require('twilio');
const { Day, TimeSlot } = require('../models');
const catchAsync = require('../utils/catchAsync');

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const timezone = 'America/New_York';

const welcome = catchAsync(async (req, res) => {
  const timeNow = moment().tz(timezone);
  const day = timeNow.day();
  const weekday = weekdays[day];
  const allDays = await Day.find();
  const dayEntry = allDays.find((i) => i.days.includes(weekday));
  let dialNumber = dayEntry.default_number;
  const timeslots = await TimeSlot.find({ day: dayEntry.id });

  const timeFormatNow = timeNow.format();
  const appendString = timeFormatNow.substring(0, 11);
  const lastString = timeFormatNow.substring(timeFormatNow.length - 9, timeFormatNow.length);
  for (const timeSlot of timeslots) {
    const timeStart = moment(`${appendString}${timeSlot.time_from}${lastString}`).tz(timezone);
    const timeEnd = moment(`${appendString}${timeSlot.time_to}${lastString}`).tz(timezone);
    if (timeNow.isAfter(timeStart) && timeNow.isBefore(timeEnd)) {
      dialNumber = timeSlot.phone_number;
    }
  }
  const response = new twilio.twiml.VoiceResponse();
  response.say('Connecting you to our executive. Please wait.');
  response.dial(dialNumber);
  res.set('Content-Type', 'text/xml');
  return res.send(response.toString());
});

module.exports = {
  welcome,
};
