const { pool } = require('../config/db');

// Public
const getAnnouncements = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM announcements WHERE is_published = true ORDER BY priority DESC, announcement_date DESC');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Admin
const getAdminAnnouncements = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM announcements ORDER BY created_at DESC');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const createAnnouncement = async (req, res) => {
  const { title, content, category, attachment_url, priority, is_featured, is_published, expiry_date } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO announcements (title, content, category, attachment_url, priority, is_featured, is_published, expiry_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [title, content, category, attachment_url, priority, is_featured, is_published, expiry_date || null]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateAnnouncement = async (req, res) => {
  const { id } = req.params;
  const { title, content, category, attachment_url, priority, is_featured, is_published, expiry_date } = req.body;
  try {
    const result = await pool.query(
      `UPDATE announcements SET title=$1, content=$2, category=$3, attachment_url=$4, priority=$5, is_featured=$6, is_published=$7, expiry_date=$8, updated_at=CURRENT_TIMESTAMP WHERE id=$9 RETURNING *`,
      [title, content, category, attachment_url, priority, is_featured, is_published, expiry_date || null, id]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const deleteAnnouncement = async (req, res) => {
  try {
    await pool.query('DELETE FROM announcements WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Announcement deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getAnnouncements, getAdminAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement };
