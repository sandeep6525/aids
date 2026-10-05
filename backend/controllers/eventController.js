const { pool } = require('../config/db');

// Get all events
const getEvents = async (req, res) => {
  try {
    const { type, status } = req.query;
    let query = 'SELECT * FROM events WHERE 1=1';
    let params = [];
    let paramCount = 1;

    if (type && type !== 'All') {
      query += ` AND event_type = $${paramCount}`;
      params.push(type.toUpperCase());
      paramCount++;
    }

    if (status) {
      query += ` AND status = $${paramCount}`;
      params.push(status.toUpperCase());
      paramCount++;
    }

    query += ' ORDER BY event_date ASC';

    const result = await pool.query(query, params);
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Unable to load events' });
  }
};

// Get upcoming events
const getUpcomingEvents = async (req, res) => {
  try {
    const query = "SELECT * FROM events WHERE status = 'UPCOMING' ORDER BY event_date ASC LIMIT 5";
    const result = await pool.query(query);
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get single event
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    
    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Admin - Get all events
const getAdminEvents = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY event_date DESC');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Create Event
const createEvent = async (req, res) => {
  const { title, description, event_type, event_date, start_time, end_time, venue, speaker, speaker_designation, poster_url, registration_url, registration_deadline, contact_person, status, featured } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO events (title, description, event_type, event_date, start_time, end_time, venue, speaker, speaker_designation, poster_url, registration_url, registration_deadline, contact_person, status, featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
      [title, description, event_type, event_date, start_time || null, end_time || null, venue, speaker, speaker_designation, poster_url, registration_url, registration_deadline || null, contact_person, status, featured]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update Event
const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, event_type, event_date, start_time, end_time, venue, speaker, speaker_designation, poster_url, registration_url, registration_deadline, contact_person, status, featured } = req.body;
  try {
    const result = await pool.query(
      `UPDATE events SET title=$1, description=$2, event_type=$3, event_date=$4, start_time=$5, end_time=$6, venue=$7, speaker=$8, speaker_designation=$9, poster_url=$10, registration_url=$11, registration_deadline=$12, contact_person=$13, status=$14, featured=$15, updated_at=CURRENT_TIMESTAMP WHERE id=$16 RETURNING *`,
      [title, description, event_type, event_date, start_time || null, end_time || null, venue, speaker, speaker_designation, poster_url, registration_url, registration_deadline || null, contact_person, status, featured, id]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete Event
const deleteEvent = async (req, res) => {
  try {
    await pool.query('DELETE FROM events WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getEvents,
  getUpcomingEvents,
  getEventById,
  getAdminEvents,
  createEvent,
  updateEvent,
  deleteEvent
};
