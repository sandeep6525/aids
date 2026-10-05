const express = require('express');
const router = express.Router();
const { getProjects, getProjectById, getAdminProjects, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { authenticateToken, requirePermission } = require('../middleware/authMiddleware');

router.get('/', getProjects);
router.get('/:id', getProjectById);

router.use('/admin', authenticateToken, requirePermission('MANAGE_PROJECTS'));
router.get('/admin', getAdminProjects);
router.post('/admin', createProject);
router.put('/admin/:id', updateProject);
router.delete('/admin/:id', deleteProject);

module.exports = router;
