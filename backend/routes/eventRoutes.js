const express = require('express');
const router = express.Router();
const { getEvents, getUpcomingEvents, getEventById, getAdminEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { authenticateToken, requirePermission } = require('../middleware/authMiddleware');

router.get('/upcoming', getUpcomingEvents);
router.get('/:id', getEventById);
router.get('/', getEvents);

// Admin CRUD foundation (Protected)
router.use('/admin', authenticateToken, requirePermission('MANAGE_EVENTS'));
router.get('/admin', getAdminEvents);
router.post('/admin', createEvent);
router.put('/admin/:id', updateEvent);
router.delete('/admin/:id', deleteEvent);

module.exports = router;
