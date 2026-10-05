const express = require('express');
const router = express.Router();
const { getAlumni, getAlumniById, createPublicAlumni, getAdminAlumni, createAlumni, updateAlumni, deleteAlumni } = require('../controllers/alumniController');
const { authenticateToken, requirePermission } = require('../middleware/authMiddleware');

router.get('/', getAlumni);
router.post('/submit', createPublicAlumni);
router.get('/:id', getAlumniById);

router.use('/admin', authenticateToken, requirePermission('MANAGE_ALUMNI'));
router.get('/admin', getAdminAlumni);
router.post('/admin', createAlumni);
router.put('/admin/:id', updateAlumni);
router.delete('/admin/:id', deleteAlumni);

module.exports = router;
