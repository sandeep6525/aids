const express = require('express');
const router = express.Router();
const { getUsers, createUser, updateUserStatus } = require('../controllers/userController');
const { authenticateToken, requireRole, requirePermission } = require('../middleware/authMiddleware');

// Only SUPER_ADMIN can manage users
router.use(authenticateToken);
router.use(requireRole(['SUPER_ADMIN']));
router.use(requirePermission('MANAGE_USERS'));

router.get('/', getUsers);
router.post('/', createUser);
router.patch('/:id/status', updateUserStatus);

module.exports = router;
