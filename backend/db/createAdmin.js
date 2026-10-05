const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const readline = require('readline');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'ai_department',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise(resolve => rl.question(query, resolve));

const createAdmin = async () => {
  try {
    console.log('--- Create User ---');
    const name = await question('Name: ');
    const email = await question('Email: ');
    const password = await question('Password: ');
    console.log('\nSelect Role:');
    console.log('1. SUPER_ADMIN');
    console.log('2. HOD');
    console.log('3. FACULTY');
    const roleInput = await question('Enter choice (1-3) [default: 1]: ');

    let role = 'SUPER_ADMIN';
    if (roleInput.trim() === '2') role = 'HOD';
    else if (roleInput.trim() === '3') role = 'FACULTY';

    const checkEmail = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (checkEmail.rows.length > 0) {
      console.log('Error: Email already exists.');
      process.exit(1);
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    await pool.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4)',
      [name, email, password_hash, role]
    );

    console.log(`Success: ${role} created successfully!`);
  } catch (error) {
    console.error('Failed to create admin:', error.message);
  } finally {
    pool.end();
    rl.close();
  }
};

createAdmin();
