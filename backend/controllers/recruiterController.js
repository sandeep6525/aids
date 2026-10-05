const { pool } = require('../config/db');

exports.getRecruiters = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM recruiting_companies WHERE is_active = true ORDER BY display_order ASC, id ASC');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getAdminRecruiters = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM recruiting_companies ORDER BY display_order ASC, id ASC');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.createRecruiter = async (req, res) => {
  const { company_name, logo_url, website_url, industry, is_active, display_order } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO recruiting_companies (company_name, logo_url, website_url, industry, is_active, display_order) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [company_name, logo_url, website_url, industry, is_active, display_order || 0]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateRecruiter = async (req, res) => {
  const { id } = req.params;
  const { company_name, logo_url, website_url, industry, is_active, display_order } = req.body;
  try {
    const result = await pool.query(
      `UPDATE recruiting_companies 
       SET company_name=$1, logo_url=$2, website_url=$3, industry=$4, is_active=$5, display_order=$6, updated_at=CURRENT_TIMESTAMP 
       WHERE id=$7 RETURNING *`,
      [company_name, logo_url, website_url, industry, is_active, display_order || 0, id]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteRecruiter = async (req, res) => {
  try {
    await pool.query('DELETE FROM recruiting_companies WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
