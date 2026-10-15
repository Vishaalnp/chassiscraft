const express = require('express');
const router = express.Router();
const {
  createQuoteRequest,
  getQuotations,
  acceptQuotationAndLaunchProject,
} = require('../controllers/quotationController');
const { protect } = require('../middleware/auth');

router.post('/rfq', protect, createQuoteRequest);
router.get('/', protect, getQuotations);
router.post('/:id/accept', protect, acceptQuotationAndLaunchProject);

module.exports = router;
