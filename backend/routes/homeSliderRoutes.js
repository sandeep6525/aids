const express = require('express');
const router = express.Router();
const { getSlides, getAdminSlides, createSlide, updateSlide, deleteSlide } = require('../controllers/homeSliderController');
const { authenticateToken, requirePermission } = require('../middleware/authMiddleware');

router.get('/', getSlides);

router.use('/admin', authenticateToken, requirePermission('MANAGE_SETTINGS'));
router.get('/admin', getAdminSlides);
router.post('/admin', createSlide);
router.put('/admin/:id', updateSlide);
router.delete('/admin/:id', deleteSlide);

module.exports = router;
