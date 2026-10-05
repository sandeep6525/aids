const { pool } = require('../config/db');

exports.createContactMessage = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO contact_messages (name, email, phone, subject, message)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, phone, subject, message]
    );
    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
};

exports.getAdminMessages = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM contact_messages ORDER BY created_at DESC");
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateMessageStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await pool.query(
      `UPDATE contact_messages SET status=$1 WHERE id=$2 RETURNING *`,
      [status, id]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    await pool.query('DELETE FROM contact_messages WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
