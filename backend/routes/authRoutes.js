const express = require('express');
const router = express.Router();
const { login, getMe, refresh, logout } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/me', authenticateToken, getMe);

module.exports = router;
