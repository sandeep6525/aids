const { pool } = require('../config/db');

exports.getAchievements = async (req, res) => {
  try {
    const { featured } = req.query;
    let query = "SELECT * FROM achievements WHERE status = 'PUBLISHED' AND is_published = true";
    if (featured === 'true') {
      query += " AND is_featured = true";
    }
    query += " ORDER BY achievement_date DESC";
    
    const result = await pool.query(query);
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getAchievementById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM achievements WHERE id = $1 AND status = 'PUBLISHED' AND is_published = true", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Achievement not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getAdminAchievements = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM achievements ORDER BY created_at DESC');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.submitAchievement = async (req, res) => {
  // Public submission
  const { title, student_name, student_register_number, achievement_type, competition, organization, position, achievement_date, description, category } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO achievements (title, student_name, student_register_number, achievement_type, competition, organization, position, achievement_date, description, category, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'PENDING_REVIEW') RETURNING *`,
      [title, student_name, student_register_number, achievement_type, competition, organization, position, achievement_date, description, category]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateAchievementStatus = async (req, res) => {
  const { id } = req.params;
  const { status, is_published, is_featured } = req.body;
  try {
    const result = await pool.query(
      `UPDATE achievements SET status=$1, is_published=$2, is_featured=$3, updated_at=CURRENT_TIMESTAMP WHERE id=$4 RETURNING *`,
      [status, is_published, is_featured, id]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteAchievement = async (req, res) => {
  try {
    await pool.query('DELETE FROM achievements WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Achievement deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
