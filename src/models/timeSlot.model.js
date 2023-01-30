const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const timeSlotSchema = mongoose.Schema(
  {
    day: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Day',
      required: true,
    },
    time_from: {
      type: String,
      required: true,
    },
    time_to: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
timeSlotSchema.plugin(toJSON);

/**
 * @typedef Phone
 */
const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);

module.exports = TimeSlot;
