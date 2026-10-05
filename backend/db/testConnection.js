require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'ai_department',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

const testConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('PostgreSQL connection successful.');
    console.log(`Database: ${process.env.DB_NAME || 'ai_department'}`);
    console.log(`Host: ${process.env.DB_HOST || 'localhost'}`);
    console.log(`Port: ${process.env.DB_PORT || 5432}`);
  } catch (err) {
    if (err.code === '28P01') {
      console.error('PostgreSQL authentication failed.');
      console.error('Check:');
      console.error('1. PostgreSQL is running');
      console.error('2. DB_USER is correct');
      console.error('3. DB_PASSWORD is correct');
      console.error('4. DB_HOST is correct');
      console.error('5. DB_PORT is correct');
    } else if (err.code === '3D000') {
      console.error(`Database "${process.env.DB_NAME || 'ai_department'}" does not exist.`);
      console.error('Please run the initialization script to create it, or create it manually.');
    } else {
      console.error('Database connection error:', err.message);
    }
  } finally {
    pool.end();
  }
};

testConnection();
