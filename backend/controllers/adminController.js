const { pool } = require('../config/db');
const { logActivity } = require('./authController');

const getDashboardStats = async (req, res) => {
  try {
    // Graceful counting, assuming tables exist based on phase 2.
    // If a table doesn't exist, this will throw, which is caught and handled or defaults can be returned.
    const getCount = async (table) => {
      try {
        const result = await pool.query(`SELECT COUNT(*) FROM ${table}`);
        return parseInt(result.rows[0].count);
      } catch (e) {
        return 0; // Return 0 safely if table doesn't exist yet
      }
    };

    const stats = {
      faculty: await getCount('faculty'),
      events: await getCount('events'),
      projects: await getCount('projects'),
      achievements: await getCount('achievements'),
      publications: await getCount('research_publications'),
      messages: await getCount('contact_messages')
    };

    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error while fetching dashboard stats.' });
  }
};

const getActivityLogs = async (req, res) => {
  try {
    const query = `
      SELECT a.id, a.action, a.module, a.description, a.created_at, u.name as user_name, u.role as user_role
      FROM activity_logs a
      LEFT JOIN users u ON a.user_id = u.id
      ORDER BY a.created_at DESC
      LIMIT 50
    `;
    const result = await pool.query(query);
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error while fetching activity logs.' });
  }
};

module.exports = {
  getDashboardStats,
  getActivityLogs
};
