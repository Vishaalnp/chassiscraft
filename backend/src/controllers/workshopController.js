const Workshop = require('../models/Workshop');
const Review = require('../models/Review');
const Project = require('../models/Project');

// @desc    Get all workshops with query filters
// @route   GET /api/workshops
// @access  Public
const getWorkshops = async (req, res, next) => {
  try {
    const { district, vehicleType, specialization, minRating, verified, search } = req.query;

    const query = {};

    if (district && district !== 'All') {
      query.district = district;
    }

    if (vehicleType && vehicleType !== 'All') {
      query.vehicleTypes = vehicleType;
    }

    if (specialization) {
      query.specializations = specialization;
    }

    if (minRating) {
      query.rating = { $gte: Number(minRating) };
    }

    if (verified === 'true') {
      query.verified = true;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
        { specializations: { $regex: search, $options: 'i' } },
      ];
    }

    const workshops = await Workshop.find(query).sort({ rating: -1, verified: -1 });

    res.status(200).json({
      success: true,
      count: workshops.length,
      data: workshops,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single workshop details with reviews
// @route   GET /api/workshops/:id
// @access  Public
const getWorkshopById = async (req, res, next) => {
  try {
    const workshop = await Workshop.findById(req.params.id);
    if (!workshop) {
      return res.status(404).json({
        success: false,
        message: 'Workshop not found.',
      });
    }

    const reviews = await Review.find({ workshopId: workshop._id }).sort({ createdAt: -1 });
    const completedProjects = await Project.find({
      workshopId: workshop._id,
      overallProgressPercentage: 100,
    }).limit(6);

    res.status(200).json({
      success: true,
      data: {
        workshop,
        reviews,
        completedProjects,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update workshop profile
// @route   PUT /api/workshops/:id
// @access  Private (Workshop Owner / Admin)
const updateWorkshopProfile = async (req, res, next) => {
  try {
    let workshop = await Workshop.findById(req.params.id);
    if (!workshop) {
      return res.status(404).json({
        success: false,
        message: 'Workshop not found.',
      });
    }

    // Role check: Only assigned owner or Admin can update
    if (req.user.role !== 'ADMIN' && workshop.ownerId && workshop.ownerId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to modify this workshop profile.',
      });
    }

    workshop = await Workshop.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: workshop,
      message: 'Workshop profile updated successfully.',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin verify or reject workshop KYC
// @route   PATCH /api/workshops/:id/verify
// @access  Private (Admin only)
const verifyWorkshopKYC = async (req, res, next) => {
  try {
    const { status } = req.body; // 'verified' | 'rejected'
    if (!['verified', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be "verified" or "rejected".',
      });
    }

    const workshop = await Workshop.findByIdAndUpdate(
      req.params.id,
      {
        verified: status === 'verified',
        kycStatus: status,
      },
      { new: true }
    );

    if (!workshop) {
      return res.status(404).json({
        success: false,
        message: 'Workshop not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: workshop,
      message: `Workshop KYC ${status === 'verified' ? 'Approved & Verified' : 'Rejected'}.`,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Compare workshops
// @route   POST /api/workshops/compare
// @access  Public
const compareWorkshops = async (req, res, next) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0 || ids.length > 3) {
      return res.status(400).json({
        success: false,
        message: 'Please provide between 1 and 3 workshop IDs for comparison.',
      });
    }

    const workshops = await Workshop.find({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      count: workshops.length,
      data: workshops,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWorkshops,
  getWorkshopById,
  updateWorkshopProfile,
  verifyWorkshopKYC,
  compareWorkshops,
};
