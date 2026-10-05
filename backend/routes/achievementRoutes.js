const express = require('express');
const router = express.Router();
const { getAchievements, getAchievementById, getAdminAchievements, submitAchievement, updateAchievementStatus, deleteAchievement } = require('../controllers/achievementController');
const { authenticateToken, requirePermission } = require('../middleware/authMiddleware');

router.get('/', getAchievements);
router.get('/:id', getAchievementById);
router.post('/submit', submitAchievement);

router.use('/admin', authenticateToken, requirePermission('MANAGE_ACHIEVEMENTS'));
router.get('/admin', getAdminAchievements);
router.patch('/admin/:id/status', updateAchievementStatus);
router.delete('/admin/:id', deleteAchievement);

module.exports = router;
