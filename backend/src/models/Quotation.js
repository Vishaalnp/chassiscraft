const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema(
  {
    quoteNumber: {
      type: String,
      required: true,
      unique: true,
    },
    quoteRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'QuoteRequest',
      required: true,
    },
    workshopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workshop',
      required: true,
    },
    workshopName: {
      type: String,
      required: true,
    },
    workshopDistrict: {
      type: String,
      required: true,
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
    customerCompany: {
      type: String,
      default: '',
    },
    configuration: {
      type: Object,
      required: true,
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
      default: 'Quotation Sent',
    },
    baseBodyPriceINR: { type: Number, required: true },
    materialsPriceINR: { type: Number, required: true },
    interiorSeatsPriceINR: { type: Number, required: true },
    electricalPaintPriceINR: { type: Number, required: true },
    labourPriceINR: { type: Number, required: true },
    discountINR: { type: Number, default: 0 },
    taxGST18INR: { type: Number, required: true },
    finalPriceINR: { type: Number, required: true },
    estimatedDeliveryWeeks: { type: Number, default: 6 },
    warrantyMonths: { type: Number, default: 24 },
    validityDays: { type: Number, default: 30 },
    validUntil: { type: String, required: true },
    inclusions: [{ type: String }],
    exclusions: [{ type: String }],
    workshopNotes: { type: String, default: '' },
    revisionNumber: { type: Number, default: 1 },
    revisionHistory: [
      {
        revisionDate: String,
        previousPriceINR: Number,
        reason: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Quotation', quotationSchema);
