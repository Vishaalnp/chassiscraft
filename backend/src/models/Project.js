const mongoose = require('mongoose');

const stageSchema = new mongoose.Schema({
  stageNumber: { type: Number, required: true },
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'delayed', 'on-hold'],
    default: 'pending',
  },
  completionPercentage: { type: Number, default: 0, min: 0, max: 100 },
  startDate: { type: String },
  completionDate: { type: String },
  assignedStaff: { type: String, default: 'Foreman' },
  notes: { type: String, default: '' },
  delayReason: { type: String, default: '' },
  photos: [{ type: String }],
});

const paymentMilestoneSchema = new mongoose.Schema({
  title: { type: String, required: true },
  percentage: { type: Number, required: true },
  amountINR: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
  paidDate: { type: String },
});

const projectSchema = new mongoose.Schema(
  {
    projectCode: {
      type: String,
      required: true,
      unique: true,
    },
    quotationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quotation',
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
    vehicleTitle: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      enum: ['Bus', 'Lorry'],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    chassisBrandModel: {
      type: String,
      required: true,
    },
    chassisVin: {
      type: String,
      required: true,
    },
    currentStageIndex: {
      type: Number,
      default: 0,
    },
    overallProgressPercentage: {
      type: Number,
      default: 0,
    },
    stages: [stageSchema],
    startDate: {
      type: String,
      required: true,
    },
    targetDeliveryDate: {
      type: String,
      required: true,
    },
    actualDeliveryDate: {
      type: String,
    },
    contractAmountINR: {
      type: Number,
      required: true,
    },
    paymentMilestones: [paymentMilestoneSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Project', projectSchema);
