const { pool } = require('../config/db');

exports.getDownloads = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM downloads WHERE is_published = true ORDER BY upload_date DESC");
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getAdminDownloads = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM downloads ORDER BY upload_date DESC');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.createDownload = async (req, res) => {
  const { title, description, file_url, category, is_published } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO downloads (title, description, file_url, category, is_published)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, description, file_url, category, is_published]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateDownload = async (req, res) => {
  const { id } = req.params;
  const { title, description, file_url, category, is_published } = req.body;
  try {
    const result = await pool.query(
      `UPDATE downloads SET title=$1, description=$2, file_url=$3, category=$4, is_published=$5, updated_at=CURRENT_TIMESTAMP WHERE id=$6 RETURNING *`,
      [title, description, file_url, category, is_published, id]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteDownload = async (req, res) => {
  try {
    await pool.query('DELETE FROM downloads WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Download deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.incrementDownloadCount = async (req, res) => {
  try {
    await pool.query('UPDATE downloads SET download_count = download_count + 1 WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Counter incremented' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
