const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const feedbackSchema = mongoose.Schema(
  {
    request: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Request',
      required: true,
    },
    reviewer: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    employee: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
      required: true,
    },
    note: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
feedbackSchema.plugin(toJSON);

/**
 * @typedef Feedback
 */
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
