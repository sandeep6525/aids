const express = require('express');
const router = express.Router();
const { getResearch, getAdminResearch, createResearch, updateResearch, deleteResearch } = require('../controllers/researchController');
const { authenticateToken, requirePermission } = require('../middleware/authMiddleware');

router.get('/', getResearch);

router.use('/admin', authenticateToken, requirePermission('MANAGE_RESEARCH'));
router.get('/admin', getAdminResearch);
router.post('/admin', createResearch);
router.put('/admin/:id', updateResearch);
router.delete('/admin/:id', deleteResearch);

module.exports = router;
