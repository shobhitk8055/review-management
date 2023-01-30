const { Phone, Day, TimeSlot } = require('../models');
const ApiError = require('../utils/ApiError');

const daysService = {};

daysService.getDays = async () => {
  const days = await Day.find();
  return days;
};

daysService.getDay = async (id) => {
  let day = await Day.findById(id);
  day = day.toObject();
  day.id = day._id;
  const timeSlots = await TimeSlot.find({ day: id });
  day.timeSlots = timeSlots;
  return day;
};

daysService.updateDay = async (id, payload) => {
  await Day.findByIdAndUpdate(id, payload);
  return 'success';
};

daysService.createTimeSlot = async (id, payload) => {
  const data = payload;
  data.day = id;
  await TimeSlot.create(payload);
  return 'success';
};

daysService.updateTimeSlot = async (id, payload) => {
  await TimeSlot.findByIdAndUpdate(id, payload);
  return 'success';
};

daysService.deleteTimeSlot = async (id) => {
  await TimeSlot.findOneAndDelete(id);
  return 'success';
};

module.exports = daysService;
