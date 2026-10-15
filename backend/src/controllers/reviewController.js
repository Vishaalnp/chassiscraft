const Review = require('../models/Review');
const Workshop = require('../models/Workshop');
const Project = require('../models/Project');

// @desc    Submit verified review
// @route   POST /api/reviews
// @access  Private (Customer)
const addReview = async (req, res, next) => {
  try {
    const {
      workshopId,
      projectId,
      overallRating,
      workmanshipRating,
      communicationRating,
      deliveryRating,
      comment,
      vehicleType,
    } = req.body;

    // Check project verification
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(400).json({
        success: false,
        message: 'Review submission requires a verified manufacturing project.',
      });
    }

    // Check duplicate
    const existing = await Review.findOne({ customerId: req.user.id, projectId });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted an official review for this vehicle project.',
      });
    }

    const review = await Review.create({
      workshopId,
      customerId: req.user.id,
      customerName: req.user.name,
      projectId,
      overallRating,
      workmanshipRating,
      communicationRating,
      deliveryRating,
      comment,
      vehicleType: vehicleType || project.vehicleTitle,
      verifiedCustomer: true,
    });

    // Recalculate average workshop rating
    const allReviews = await Review.find({ workshopId });
    const avg = Number(
      (allReviews.reduce((acc, r) => acc + r.overallRating, 0) / allReviews.length).toFixed(1)
    );

    await Workshop.findByIdAndUpdate(workshopId, {
      rating: avg,
      reviewCount: allReviews.length,
    });

    res.status(201).json({
      success: true,
      data: review,
      message: 'Review submitted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Workshop owner replies to a review
// @route   PATCH /api/reviews/:id/reply
// @access  Private (Workshop Owner / Admin)
const replyReview = async (req, res, next) => {
  try {
    const { reply } = req.body;
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found.',
      });
    }

    review.workshopReply = reply;
    await review.save();

    res.status(200).json({
      success: true,
      data: review,
      message: 'Reply posted to review.',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all reviews for a workshop
// @route   GET /api/reviews/workshop/:workshopId
// @access  Public
const getWorkshopReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ workshopId: req.params.workshopId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addReview,
  replyReview,
  getWorkshopReviews,
};
