const express = require('express');
const router = express.Router();
const { getSettings, updateSetting } = require('../controllers/settingController');
const { authenticateToken, requirePermission } = require('../middleware/authMiddleware');

router.get('/', getSettings);

router.use('/admin', authenticateToken, requirePermission('MANAGE_SETTINGS'));
router.put('/admin/:key', updateSetting);

module.exports = router;
