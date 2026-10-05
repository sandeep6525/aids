const express = require('express');
const router = express.Router();
const { getAnnouncements, getAdminAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } = require('../controllers/announcementController');
const { authenticateToken, requirePermission } = require('../middleware/authMiddleware');

router.get('/', getAnnouncements);

router.use('/admin', authenticateToken, requirePermission('MANAGE_ANNOUNCEMENTS'));
router.get('/admin', getAdminAnnouncements);
router.post('/admin', createAnnouncement);
router.put('/admin/:id', updateAnnouncement);
router.delete('/admin/:id', deleteAnnouncement);

module.exports = router;
