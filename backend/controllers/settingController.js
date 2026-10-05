const { pool } = require('../config/db');

exports.getSettings = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM website_settings');
    const settings = result.rows.reduce((acc, row) => {
      acc[row.key] = row.value;
      return acc;
    }, {});
    res.json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateSetting = async (req, res) => {
  const { key } = req.params;
  const { value, description } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO website_settings (key, value, description, updated_by) 
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (key) DO UPDATE 
       SET value = EXCLUDED.value, description = EXCLUDED.description, updated_at = CURRENT_TIMESTAMP, updated_by = EXCLUDED.updated_by
       RETURNING *`,
      [key, JSON.stringify(value), description, req.user?.id || null]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
