const express = require('express');
const router = express.Router();
const { 
  getAlbums, getAdminAlbums, createAlbum, updateAlbum, deleteAlbum,
  getImagesByAlbum, addImageToAlbum, deleteImage 
} = require('../controllers/galleryController');
const { authenticateToken, requirePermission } = require('../middleware/authMiddleware');

router.get('/albums', getAlbums);
router.get('/albums/:albumId/images', getImagesByAlbum);

router.use('/admin', authenticateToken, requirePermission('MANAGE_GALLERY'));
router.get('/admin/albums', getAdminAlbums);
router.post('/admin/albums', createAlbum);
router.put('/admin/albums/:id', updateAlbum);
router.delete('/admin/albums/:id', deleteAlbum);

router.post('/admin/albums/:albumId/images', addImageToAlbum);
router.delete('/admin/images/:imageId', deleteImage);

module.exports = router;
