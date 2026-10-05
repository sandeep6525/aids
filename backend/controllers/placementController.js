const { pool } = require('../config/db');

// --- Statistics ---
exports.getStatistics = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM placement_statistics ORDER BY placement_year DESC');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.createStatistic = async (req, res) => {
  const { placement_year, total_students, placed_students, placement_percentage, highest_package, average_package, lowest_package } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO placement_statistics (placement_year, total_students, placed_students, placement_percentage, highest_package, average_package, lowest_package)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [placement_year, total_students, placed_students, placement_percentage, highest_package, average_package, lowest_package]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateStatistic = async (req, res) => {
  const { id } = req.params;
  const { placement_year, total_students, placed_students, placement_percentage, highest_package, average_package, lowest_package } = req.body;
  try {
    const result = await pool.query(
      `UPDATE placement_statistics SET placement_year=$1, total_students=$2, placed_students=$3, placement_percentage=$4, highest_package=$5, average_package=$6, lowest_package=$7, updated_at=CURRENT_TIMESTAMP WHERE id=$8 RETURNING *`,
      [placement_year, total_students, placed_students, placement_percentage, highest_package, average_package, lowest_package, id]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteStatistic = async (req, res) => {
  try {
    await pool.query('DELETE FROM placement_statistics WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// --- Students ---
exports.getStudents = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM placement_students ORDER BY graduation_year DESC, package DESC');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.createStudent = async (req, res) => {
  const { name, programme, graduation_year, company, package, role, photo_url, is_featured } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO placement_students (name, programme, graduation_year, company, package, role, photo_url, is_featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [name, programme, graduation_year, company, package, role, photo_url, is_featured]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, programme, graduation_year, company, package, role, photo_url, is_featured } = req.body;
  try {
    const result = await pool.query(
      `UPDATE placement_students SET name=$1, programme=$2, graduation_year=$3, company=$4, package=$5, role=$6, photo_url=$7, is_featured=$8, updated_at=CURRENT_TIMESTAMP WHERE id=$9 RETURNING *`,
      [name, programme, graduation_year, company, package, role, photo_url, is_featured, id]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await pool.query('DELETE FROM placement_students WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
