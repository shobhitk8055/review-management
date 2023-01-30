const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const daySchema = mongoose.Schema(
  {
    days: {
      type: [String],
      required: true,
    },
    default_number: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
daySchema.plugin(toJSON);

/**
 * @typedef Phone
 */
const Day = mongoose.model('Day', daySchema);

module.exports = Day;
