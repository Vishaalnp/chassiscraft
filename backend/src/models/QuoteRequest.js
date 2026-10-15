const mongoose = require('mongoose');

const quoteRequestSchema = new mongoose.Schema(
  {
    rfqNumber: {
      type: String,
      required: true,
      unique: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    customerCompany: {
      type: String,
      default: '',
    },
    targetWorkshops: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workshop',
      },
    ],
    configuration: {
      type: Object,
      required: true,
    },
    targetBudgetINR: {
      type: Number,
      required: true,
    },
    customerNotes: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: [
        'Draft',
        'Submitted',
        'Under Review',
        'Quotation Sent',
        'Revision Requested',
        'Accepted',
        'Rejected',
        'Expired',
      ],
      default: 'Submitted',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('QuoteRequest', quoteRequestSchema);
