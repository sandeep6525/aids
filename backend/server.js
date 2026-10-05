const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { pool } = require('./config/db');

// Route imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const eventRoutes = require('./routes/eventRoutes');
const projectRoutes = require('./routes/projectRoutes');
const homeSliderRoutes = require('./routes/homeSliderRoutes');
const settingRoutes = require('./routes/settingRoutes');
const achievementRoutes = require('./routes/achievementRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const academicsRoutes = require('./routes/academicsRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const placementRoutes = require('./routes/placementRoutes');
const researchRoutes = require('./routes/researchRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const alumniRoutes = require('./routes/alumniRoutes');
const downloadRoutes = require('./routes/downloadRoutes');
const contactRoutes = require('./routes/contactRoutes');
const recruiterRoutes = require('./routes/recruiterRoutes');
const path = require('path');

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin/users', userRoutes);
app.use('/api/admin/upload', uploadRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/home-slider', homeSliderRoutes);
app.use('/api/website-settings', settingRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/academics', academicsRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/placements', placementRoutes);
app.use('/api/research', researchRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/alumni', alumniRoutes);
app.use('/api/downloads', downloadRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/recruiters', recruiterRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', success: true, message: 'API is running' });
});

// Centralized Error Handling
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'API Route Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}

module.exports = app;
