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
    await pool.query('ALTER TABLE achievements ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0;');
    await pool.query('ALTER TABLE recruiting_companies ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0;');
    await pool.query('ALTER TABLE projects ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0;');
    await pool.query('ALTER TABLE downloads ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0;');
    console.log('Added display_order to achievements, recruiting_companies, projects, downloads.');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    pool.end();
  }
};

migrate();
