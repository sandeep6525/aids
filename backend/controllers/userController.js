const { pool } = require('../config/db');
const bcrypt = require('bcrypt');
const { logActivity } = require('./authController');

const getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, role, is_active, last_login_at, created_at FROM users ORDER BY created_at DESC');
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error while fetching users.' });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;

    if (!name || !email || !role || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const checkEmail = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (checkEmail.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'Email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const result = await pool.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, password_hash, role]
    );

    await logActivity(req.user.id, 'Created new user', 'USERS', result.rows[0].id, `User ${email} created as ${role}`);

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error while creating user.' });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_active } = req.body;

    if (parseInt(id) === req.user.id) {
      return res.status(400).json({ success: false, message: 'Cannot deactivate yourself.' });
    }

    const result = await pool.query(
      'UPDATE users SET is_active = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, email, is_active',
      [is_active, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    await logActivity(req.user.id, 'Updated user status', 'USERS', id, `User ${result.rows[0].email} status set to ${is_active}`);

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error while updating user status.' });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUserStatus
};
