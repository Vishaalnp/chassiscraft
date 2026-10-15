const express = require('express');
const router = express.Router();
const {
  addReview,
  replyReview,
  getWorkshopReviews,
} = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/auth');

router.get('/workshop/:workshopId', getWorkshopReviews);
router.post('/', protect, addReview);
router.patch('/:id/reply', protect, authorize('WORKSHOP_OWNER', 'ADMIN'), replyReview);

module.exports = router;
