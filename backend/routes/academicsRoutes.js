const express = require('express');
const router = express.Router();
const { 
  getProgrammes, getAdminProgrammes, createProgramme, updateProgramme, deleteProgramme,
  getCourses, getAdminCourses, createCourse, updateCourse, deleteCourse
} = require('../controllers/academicsController');
const { authenticateToken, requirePermission } = require('../middleware/authMiddleware');

// Public
router.get('/programmes', getProgrammes);
router.get('/courses', getCourses);

// Admin (Protected)
router.use('/admin', authenticateToken, requirePermission('MANAGE_ACADEMICS'));

router.get('/admin/programmes', getAdminProgrammes);
router.post('/admin/programmes', createProgramme);
router.put('/admin/programmes/:id', updateProgramme);
router.delete('/admin/programmes/:id', deleteProgramme);

router.get('/admin/courses', getAdminCourses);
router.post('/admin/courses', createCourse);
router.put('/admin/courses/:id', updateCourse);
router.delete('/admin/courses/:id', deleteCourse);

module.exports = router;
