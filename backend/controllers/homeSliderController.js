const { pool } = require('../config/db');

exports.getSlides = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM home_slider WHERE is_active = true AND is_featured = true ORDER BY display_order ASC');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getAdminSlides = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM home_slider ORDER BY display_order ASC');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.createSlide = async (req, res) => {
  const { title, subtitle, description, media_type, media_url, poster_url, mobile_media_url, button_text, button_url, display_order, is_active, is_featured } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO home_slider (title, subtitle, description, media_type, media_url, poster_url, mobile_media_url, button_text, button_url, display_order, is_active, is_featured, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [title, subtitle, description, media_type, media_url, poster_url, mobile_media_url, button_text, button_url, display_order, is_active, is_featured, req.user?.id || null]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateSlide = async (req, res) => {
  const { id } = req.params;
  const { title, subtitle, description, media_type, media_url, poster_url, mobile_media_url, button_text, button_url, display_order, is_active, is_featured } = req.body;
  try {
    const result = await pool.query(
      `UPDATE home_slider SET title=$1, subtitle=$2, description=$3, media_type=$4, media_url=$5, poster_url=$6, mobile_media_url=$7, button_text=$8, button_url=$9, display_order=$10, is_active=$11, is_featured=$12, updated_at=CURRENT_TIMESTAMP WHERE id=$13 RETURNING *`,
      [title, subtitle, description, media_type, media_url, poster_url, mobile_media_url, button_text, button_url, display_order, is_active, is_featured, id]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteSlide = async (req, res) => {
  try {
    await pool.query('DELETE FROM home_slider WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Slide deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
