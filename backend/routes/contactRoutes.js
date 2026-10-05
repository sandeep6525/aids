const express = require('express');
const router = express.Router();
const { createContactMessage, getAdminMessages, updateMessageStatus, deleteMessage } = require('../controllers/contactController');
const { authenticateToken, requirePermission } = require('../middleware/authMiddleware');

router.post('/', createContactMessage);

router.use('/admin', authenticateToken, requirePermission('VIEW_MESSAGES'));
router.get('/admin', getAdminMessages);
router.put('/admin/:id', updateMessageStatus);
router.delete('/admin/:id', deleteMessage);

module.exports = router;
