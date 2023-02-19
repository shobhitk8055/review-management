const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const requestSchema = mongoose.Schema(
  {
    note: {
      type: String,
      required: true,
    },
    employee: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'assigned'],
      default: 'pending',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
requestSchema.plugin(toJSON);

/**
 * @typedef Request
 */
const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
