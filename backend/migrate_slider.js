const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'ai_department',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

const migrate = async () => {
  try {
    await pool.query('ALTER TABLE home_slider ADD COLUMN IF NOT EXISTS mobile_media_url TEXT;');
    console.log('Added mobile_media_url to home_slider.');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    pool.end();
  }
};

migrate();
