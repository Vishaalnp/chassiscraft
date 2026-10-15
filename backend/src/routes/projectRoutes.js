const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectById,
  updateProjectStage,
} = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, getProjects);
router.get('/:id', protect, getProjectById);
router.patch(
  '/:id/stages/:stageNumber',
  protect,
  authorize('WORKSHOP_OWNER', 'ADMIN'),
  updateProjectStage
);

module.exports = router;
