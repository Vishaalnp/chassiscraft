const Project = require('../models/Project');

// @desc    Get manufacturing projects
// @route   GET /api/projects
// @access  Private
const getProjects = async (req, res, next) => {
  try {
    let query = {};
    if (req.user.role === 'CUSTOMER') {
      query.customerId = req.user.id;
    } else if (req.user.role === 'WORKSHOP_OWNER' && req.user.workshopId) {
      query.workshopId = req.user.workshopId;
    }

    const projects = await Project.find(query).sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get project details by ID
// @route   GET /api/projects/:id
// @access  Private
const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update stage progress in 15-stage manufacturing timeline
// @route   PATCH /api/projects/:id/stages/:stageNumber
// @access  Private (Workshop Owner / Admin)
const updateProjectStage = async (req, res, next) => {
  try {
    const { status, notes, delayReason, photoUrl } = req.body;
    const stageNum = Number(req.params.stageNumber);

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    const stage = project.stages.find((s) => s.stageNumber === stageNum);
    if (!stage) {
      return res.status(404).json({
        success: false,
        message: `Stage #${stageNum} not found in project.`,
      });
    }

    if (status) {
      stage.status = status;
      if (status === 'completed') {
        stage.completionPercentage = 100;
        stage.completionDate = new Date().toISOString().split('T')[0];
      } else if (status === 'in-progress') {
        stage.completionPercentage = 50;
        if (!stage.startDate) stage.startDate = new Date().toISOString().split('T')[0];
      }
    }

    if (notes !== undefined) stage.notes = notes;
    if (delayReason !== undefined) stage.delayReason = delayReason;
    if (photoUrl && !stage.photos.includes(photoUrl)) {
      stage.photos.push(photoUrl);
    }

    // Recalculate overall progress
    const completedCount = project.stages.filter((s) => s.status === 'completed').length;
    const inProgressCount = project.stages.filter((s) => s.status === 'in-progress').length;
    project.overallProgressPercentage = Math.round(
      ((completedCount * 100) + (inProgressCount * 50)) / project.stages.length
    );

    let activeIdx = project.stages.findIndex((s) => s.status === 'in-progress');
    if (activeIdx === -1) {
      activeIdx = Math.min(completedCount, project.stages.length - 1);
    }
    project.currentStageIndex = activeIdx;

    await project.save();

    res.status(200).json({
      success: true,
      data: project,
      message: `Stage #${stageNum} updated successfully.`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProjectById,
  updateProjectStage,
};
