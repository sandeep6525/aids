const express = require('express');
const router = express.Router();
const { getFaculty, getFacultyById, getAdminFaculty, createFaculty, updateFaculty, deleteFaculty } = require('../controllers/facultyController');
const { authenticateToken, requirePermission } = require('../middleware/authMiddleware');

router.get('/', getFaculty);
router.get('/:id', getFacultyById);

// Admin CRUD foundation (Protected)
router.use('/admin', authenticateToken, requirePermission('MANAGE_FACULTY'));
router.get('/admin', getAdminFaculty);
router.post('/admin', createFaculty);
router.put('/admin/:id', updateFaculty);
router.delete('/admin/:id', deleteFaculty);

module.exports = router;
