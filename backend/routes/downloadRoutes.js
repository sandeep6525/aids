const express = require('express');
const router = express.Router();
const { getDownloads, getAdminDownloads, createDownload, updateDownload, deleteDownload, incrementDownloadCount } = require('../controllers/downloadController');
const { authenticateToken, requirePermission } = require('../middleware/authMiddleware');

router.get('/', getDownloads);
router.post('/:id/increment', incrementDownloadCount);

router.use('/admin', authenticateToken, requirePermission('MANAGE_DOWNLOADS'));
router.get('/admin', getAdminDownloads);
router.post('/admin', createDownload);
router.put('/admin/:id', updateDownload);
router.delete('/admin/:id', deleteDownload);

module.exports = router;
