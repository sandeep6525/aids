const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const { authenticateToken } = require('../middleware/authMiddleware');
const fs = require('fs');

// Vercel Blob
const { put } = require('@vercel/blob');

// Ensure uploads directory exists for local fallback
const uploadDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Use memory storage for Vercel Blob, disk for local
const useVercelBlob = !!process.env.BLOB_READ_WRITE_TOKEN;

const storage = useVercelBlob 
  ? multer.memoryStorage()
  : multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, uploadDir);
      },
      filename: function (req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase();
        const uniqueSuffix = crypto.randomBytes(8).toString('hex') + '-' + Date.now();
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
      }
    });

const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm', 'application/pdf'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, WEBP, MP4, WEBM, and PDF are allowed.'), false);
  }
};

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB max for videos
  },
  fileFilter: fileFilter
});

router.post('/', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded or invalid file type.' });
    }

    let fileUrl;
    let filename;

    if (useVercelBlob) {
      const ext = path.extname(req.file.originalname).toLowerCase();
      const uniqueName = crypto.randomBytes(8).toString('hex') + '-' + Date.now() + ext;
      const blob = await put(`uploads/${uniqueName}`, req.file.buffer, {
        access: 'public',
        contentType: req.file.mimetype,
      });
      fileUrl = blob.url;
      filename = uniqueName;
    } else {
      // Local fallback
      const baseUrl = process.env.BACKEND_URL || `${req.protocol}://${req.get('host')}`;
      fileUrl = `${baseUrl}/uploads/${req.file.filename}`;
      filename = req.file.filename;
    }
    
    res.status(201).json({
      success: true,
      data: {
        url: fileUrl,
        filename: filename,
        mimetype: req.file.mimetype,
        size: req.file.size
      }
    });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ success: false, message: 'Upload failed', error: error.message });
  }
});

module.exports = router;
