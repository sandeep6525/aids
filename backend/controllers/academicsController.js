const { pool } = require('../config/db');

// --- Programmes ---
exports.getProgrammes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM programmes WHERE is_active = true ORDER BY display_order ASC');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getAdminProgrammes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM programmes ORDER BY display_order ASC');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.createProgramme = async (req, res) => {
  const { title, duration, description, is_active, display_order } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO programmes (title, duration, description, is_active, display_order)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, duration, description, is_active, display_order]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateProgramme = async (req, res) => {
  const { id } = req.params;
  const { title, duration, description, is_active, display_order } = req.body;
  try {
    const result = await pool.query(
      `UPDATE programmes SET title=$1, duration=$2, description=$3, is_active=$4, display_order=$5, updated_at=CURRENT_TIMESTAMP WHERE id=$6 RETURNING *`,
      [title, duration, description, is_active, display_order, id]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteProgramme = async (req, res) => {
  try {
    await pool.query('DELETE FROM programmes WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Programme deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// --- Courses ---
exports.getCourses = async (req, res) => {
  try {
    const { semester, programme_id } = req.query;
    let query = 'SELECT * FROM courses WHERE is_active = true';
    let params = [];
    let paramCount = 1;

    if (semester) {
      query += ` AND semester = $${paramCount}`;
      params.push(semester);
      paramCount++;
    }
    if (programme_id) {
      query += ` AND programme_id = $${paramCount}`;
      params.push(programme_id);
      paramCount++;
    }
    
    query += ' ORDER BY code ASC';
    const result = await pool.query(query, params);
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getAdminCourses = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM courses ORDER BY semester ASC, code ASC');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.createCourse = async (req, res) => {
  const { programme_id, semester, code, course, type, credits, pdf_url, is_active } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO courses (programme_id, semester, code, course, type, credits, pdf_url, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [programme_id, semester, code, course, type, credits, pdf_url, is_active]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const { programme_id, semester, code, course, type, credits, pdf_url, is_active } = req.body;
  try {
    const result = await pool.query(
      `UPDATE courses SET programme_id=$1, semester=$2, code=$3, course=$4, type=$5, credits=$6, pdf_url=$7, is_active=$8, updated_at=CURRENT_TIMESTAMP WHERE id=$9 RETURNING *`,
      [programme_id, semester, code, course, type, credits, pdf_url, is_active, id]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    await pool.query('DELETE FROM courses WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
