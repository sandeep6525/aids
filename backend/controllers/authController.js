const { pool } = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const logActivity = async (user_id, action, module = null, record_id = null, description = null) => {
  try {
    await pool.query(
      'INSERT INTO activity_logs (user_id, action, module, record_id, description) VALUES ($1, $2, $3, $4, $5)',
      [user_id, action, module, record_id, description]
    );
  } catch (err) {
    console.error('Error logging activity:', err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const user = result.rows[0];
    
    if (!user.is_active) {
      return res.status(403).json({ success: false, message: 'Account is inactive. Please contact administrator.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    // Update last login
    await pool.query('UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = $1', [user.id]);
    
    // Log activity
    await logActivity(user.id, 'Admin logged in', 'AUTH', null, 'Successful login');

    // Generate tokens
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_super_secret_key_here',
      { expiresIn: process.env.JWT_ACCESS_EXPIRES || '1h' }
    );

    // Normally refresh tokens go in HttpOnly cookies, but for this phase we'll return it
    // so the client can store it (or just use accessToken for now).
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'your_jwt_super_secret_key_here',
      { expiresIn: process.env.JWT_REFRESH_EXPIRES || '7d' }
    );

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        accessToken,
        refreshToken
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error during login.' });
  }
};

const getMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query('SELECT id, name, email, role, is_active FROM users WHERE id = $1', [userId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    if (!result.rows[0].is_active) {
      return res.status(403).json({ success: false, message: 'Account is inactive.' });
    }

    res.status(200).json({ success: true, data: { user: result.rows[0] } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ success: false, message: 'No refresh token provided.' });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET || 'your_jwt_super_secret_key_here');
    
    // Verify user exists and is active
    const result = await pool.query('SELECT * FROM users WHERE id = $1 AND is_active = true', [decoded.id]);
    if (result.rows.length === 0) {
      return res.status(403).json({ success: false, message: 'Invalid refresh token or inactive user.' });
    }

    const user = result.rows[0];

    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_super_secret_key_here',
      { expiresIn: process.env.JWT_ACCESS_EXPIRES || '1h' }
    );

    res.status(200).json({ success: true, data: { accessToken } });
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Invalid or expired refresh token.' });
  }
};

const logout = async (req, res) => {
  // Client is responsible for deleting the token. If HttpOnly cookie used, clear it here.
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

module.exports = {
  login,
  getMe,
  refresh,
  logout,
  logActivity
};
