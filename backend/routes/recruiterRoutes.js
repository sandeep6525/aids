const express = require('express');
const router = express.Router();
const { getRecruiters, getAdminRecruiters, createRecruiter, updateRecruiter, deleteRecruiter } = require('../controllers/recruiterController');
const { authenticateToken, requirePermission } = require('../middleware/authMiddleware');

router.get('/', getRecruiters);

router.use('/admin', authenticateToken, requirePermission('MANAGE_RECRUITERS'));
router.get('/admin', getAdminRecruiters);
router.post('/admin', createRecruiter);
router.put('/admin/:id', updateRecruiter);
router.delete('/admin/:id', deleteRecruiter);

module.exports = router;
