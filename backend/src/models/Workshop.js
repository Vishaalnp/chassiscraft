const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide workshop name'],
      trim: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    district: {
      type: String,
      required: [true, 'District is required'],
      enum: [
        'Karur', 'Namakkal', 'Coimbatore', 'Chennai', 'Salem', 'Madurai', 
        'Erode', 'Tiruchirappalli', 'Dindigul', 'Tirupur', 'Thanjavur', 'Vellore'
      ],
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    establishedYear: {
      type: Number,
      default: 2005,
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    kycStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
    specializations: [
      {
        type: String,
      },
    ],
    vehicleTypes: [
      {
        type: String,
        enum: ['Bus', 'Lorry', 'Specialized'],
      },
    ],
    startingPriceINR: {
      type: Number,
      default: 650000,
    },
    leadTimeWeeks: {
      type: Number,
      default: 6,
    },
    warrantyMonths: {
      type: Number,
      default: 24,
    },
    certifications: [
      {
        type: String,
      },
    ],
    coverImage: {
      type: String,
      default: '',
    },
    galleryImages: [
      {
        type: String,
      },
    ],
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    description: {
      type: String,
      required: true,
    },
    facilities: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Workshop', workshopSchema);
