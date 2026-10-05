const express = require('express');
const router = express.Router();
const { 
  getStatistics, createStatistic, updateStatistic, deleteStatistic,
  getStudents, createStudent, updateStudent, deleteStudent
} = require('../controllers/placementController');
const { authenticateToken, requirePermission } = require('../middleware/authMiddleware');

router.get('/statistics', getStatistics);
router.get('/students', getStudents);

router.use('/admin', authenticateToken, requirePermission('MANAGE_PLACEMENTS'));

router.get('/admin/statistics', getStatistics);
router.post('/admin/statistics', createStatistic);
router.put('/admin/statistics/:id', updateStatistic);
router.delete('/admin/statistics/:id', deleteStatistic);

router.get('/admin/students', getStudents);
router.post('/admin/students', createStudent);
router.put('/admin/students/:id', updateStudent);
router.delete('/admin/students/:id', deleteStudent);

module.exports = router;
