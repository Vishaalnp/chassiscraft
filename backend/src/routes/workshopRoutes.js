const express = require('express');
const router = express.Router();
const {
  getWorkshops,
  getWorkshopById,
  updateWorkshopProfile,
  verifyWorkshopKYC,
  compareWorkshops,
} = require('../controllers/workshopController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getWorkshops);
router.post('/compare', compareWorkshops);
router.get('/:id', getWorkshopById);
router.put('/:id', protect, authorize('WORKSHOP_OWNER', 'ADMIN'), updateWorkshopProfile);
router.patch('/:id/verify', protect, authorize('ADMIN'), verifyWorkshopKYC);

module.exports = router;
