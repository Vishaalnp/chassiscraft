const mongoose = require('mongoose');

const chassisSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
      enum: ['Ashok Leyland', 'Tata Motors', 'BharatBenz', 'Eicher Motors', 'Mahindra'],
    },
    model: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      enum: ['Bus', 'Lorry', 'Both'],
      required: true,
    },
    wheelbaseMm: {
      type: Number,
      required: true,
    },
    gvwKg: {
      type: Number,
      required: true,
    },
    engineHp: {
      type: Number,
      required: true,
    },
    fuelType: {
      type: String,
      enum: ['Diesel', 'CNG', 'Electric', 'LNG'],
      default: 'Diesel',
    },
    basePriceINR: {
      type: Number,
      required: true,
    },
    overhangFrontMm: {
      type: Number,
      required: true,
    },
    overhangRearMm: {
      type: Number,
      required: true,
    },
    maxPermissibleLengthMm: {
      type: Number,
      required: true,
    },
    stockAvailable: {
      type: Number,
      default: 10,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Chassis', chassisSchema);
