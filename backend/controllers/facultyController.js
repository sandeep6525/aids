const { pool } = require('../config/db');

// Get all faculty
const getFaculty = async (req, res) => {
  try {
    const { designation } = req.query;
    let query = 'SELECT * FROM faculty WHERE is_active = true';
    let params = [];

    if (designation) {
      query += ' AND designation = $1';
      params.push(designation);
    }
    
    query += ' ORDER BY display_order ASC, id ASC';
    
    const result = await pool.query(query, params);
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Unable to load faculty information. Please try again.' });
  }
};

// Get single faculty
const getFacultyById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM faculty WHERE id = $1 AND is_active = true', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Faculty member not found' });
    }
    
    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all faculty for Admin
const getAdminFaculty = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM faculty ORDER BY display_order ASC, id ASC');
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Create faculty
const createFaculty = async (req, res) => {
  const { name, designation, qualification, experience, specialization, subjects, research_interests, email, linkedin_url, orcid_url, photo_url, bio, is_active, display_order } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO faculty (name, designation, qualification, experience, specialization, subjects, research_interests, email, linkedin_url, orcid_url, photo_url, bio, is_active, display_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
      [name, designation, qualification, experience, specialization, subjects, research_interests, email, linkedin_url, orcid_url, photo_url, bio, is_active, display_order]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update faculty
const updateFaculty = async (req, res) => {
  const { id } = req.params;
  const { name, designation, qualification, experience, specialization, subjects, research_interests, email, linkedin_url, orcid_url, photo_url, bio, is_active, display_order } = req.body;
  try {
    const result = await pool.query(
      `UPDATE faculty SET name=$1, designation=$2, qualification=$3, experience=$4, specialization=$5, subjects=$6, research_interests=$7, email=$8, linkedin_url=$9, orcid_url=$10, photo_url=$11, bio=$12, is_active=$13, display_order=$14, updated_at=CURRENT_TIMESTAMP WHERE id=$15 RETURNING *`,
      [name, designation, qualification, experience, specialization, subjects, research_interests, email, linkedin_url, orcid_url, photo_url, bio, is_active, display_order, id]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete faculty
const deleteFaculty = async (req, res) => {
  try {
    await pool.query('DELETE FROM faculty WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Faculty deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getFaculty,
  getFacultyById,
  getAdminFaculty,
  createFaculty,
  updateFaculty,
  deleteFaculty
};
