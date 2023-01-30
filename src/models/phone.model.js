const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const phoneSchema = mongoose.Schema(
  {
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
phoneSchema.plugin(toJSON);

/**
 * @typedef Phone
 */
const Phone = mongoose.model('Phone', phoneSchema);

module.exports = Phone;
