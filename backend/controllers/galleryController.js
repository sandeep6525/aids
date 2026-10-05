const { pool } = require('../config/db');

// --- Gallery Albums ---
exports.getAlbums = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM gallery_albums WHERE is_published = true ORDER BY display_order ASC, event_date DESC');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getAdminAlbums = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM gallery_albums ORDER BY display_order ASC, event_date DESC');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.createAlbum = async (req, res) => {
  const { title, description, cover_image_url, event_name, event_date, category, is_published, display_order } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO gallery_albums (title, description, cover_image_url, event_name, event_date, category, is_published, display_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [title, description, cover_image_url, event_name, event_date || null, category, is_published, display_order || 0]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateAlbum = async (req, res) => {
  const { id } = req.params;
  const { title, description, cover_image_url, event_name, event_date, category, is_published, display_order } = req.body;
  try {
    const result = await pool.query(
      `UPDATE gallery_albums SET title=$1, description=$2, cover_image_url=$3, event_name=$4, event_date=$5, category=$6, is_published=$7, display_order=$8, updated_at=CURRENT_TIMESTAMP WHERE id=$9 RETURNING *`,
      [title, description, cover_image_url, event_name, event_date || null, category, is_published, display_order || 0, id]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteAlbum = async (req, res) => {
  try {
    await pool.query('DELETE FROM gallery_albums WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Album deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// --- Gallery Images ---
exports.getImagesByAlbum = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM gallery_images WHERE album_id = $1 ORDER BY display_order ASC', [req.params.albumId]);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.addImageToAlbum = async (req, res) => {
  const { image_url, caption, alt_text, display_order } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO gallery_images (album_id, image_url, caption, alt_text, display_order)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [req.params.albumId, image_url, caption, alt_text, display_order || 0]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    await pool.query('DELETE FROM gallery_images WHERE id = $1', [req.params.imageId]);
    res.json({ success: true, message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
