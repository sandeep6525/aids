const express = require('express');
const router = express.Router();
const { getDashboardStats, getActivityLogs } = require('../controllers/adminController');
const { authenticateToken, requirePermission } = require('../middleware/authMiddleware');

router.use(authenticateToken);

// Accessible by any authenticated admin for dashboard stats
router.get('/dashboard', getDashboardStats);

// Only those with permission can view logs
router.get('/activity-logs', requirePermission('VIEW_ACTIVITY_LOGS'), getActivityLogs);

module.exports = router;
