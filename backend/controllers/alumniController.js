const { pool } = require('../config/db');

exports.getAlumni = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM alumni WHERE is_published = true ORDER BY graduation_year DESC, name ASC');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getAlumniById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM alumni WHERE id = $1 AND is_published = true', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Alumni not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.createPublicAlumni = async (req, res) => {
  const { name, graduation_year, programme, company, designation, location, linkedin_url, bio } = req.body;
  try {
    // Public submissions are unfeatured and unpublished (Pending Review)
    const result = await pool.query(
      `INSERT INTO alumni (name, graduation_year, programme, company, designation, location, linkedin_url, bio, is_featured, is_published)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, false, false) RETURNING *`,
      [name, graduation_year, programme, company, designation, location, linkedin_url, bio]
    );
    res.status(201).json({ success: true, data: result.rows[0], message: 'Profile submitted for review.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getAdminAlumni = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM alumni ORDER BY graduation_year DESC');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.createAlumni = async (req, res) => {
  const { name, graduation_year, programme, company, designation, location, profile_photo_url, linkedin_url, bio, is_featured, is_published } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO alumni (name, graduation_year, programme, company, designation, location, profile_photo_url, linkedin_url, bio, is_featured, is_published)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [name, graduation_year, programme, company, designation, location, profile_photo_url, linkedin_url, bio, is_featured, is_published]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateAlumni = async (req, res) => {
  const { id } = req.params;
  const { name, graduation_year, programme, company, designation, location, profile_photo_url, linkedin_url, bio, is_featured, is_published } = req.body;
  try {
    const result = await pool.query(
      `UPDATE alumni SET name=$1, graduation_year=$2, programme=$3, company=$4, designation=$5, location=$6, profile_photo_url=$7, linkedin_url=$8, bio=$9, is_featured=$10, is_published=$11, updated_at=CURRENT_TIMESTAMP WHERE id=$12 RETURNING *`,
      [name, graduation_year, programme, company, designation, location, profile_photo_url, linkedin_url, bio, is_featured, is_published, id]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteAlumni = async (req, res) => {
  try {
    await pool.query('DELETE FROM alumni WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Alumni deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
