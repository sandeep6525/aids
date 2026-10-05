require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'ai_department',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

async function run() {
  try {
    const result = await pool.query('SELECT count(*) FROM home_slider');
    if (parseInt(result.rows[0].count) === 0) {
      await pool.query(
        "INSERT INTO home_slider (title, subtitle, description, media_type, media_url, button_text, button_url, display_order, is_active, is_featured) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
        [
          'Department of Artificial Intelligence',
          'Empowering the Next Generation of Intelligent Innovators',
          'Building strong foundations in artificial intelligence, machine learning, data science and emerging technologies through academic excellence, research and industry collaboration.',
          'IMAGE',
          'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
          'Explore Programs',
          '/academics',
          1,
          true,
          true
        ]
      );
      console.log('Seeded home slider');
    } else {
      console.log('Home slider already seeded');
    }
  } catch (error) {
    console.error('Error seeding slider:', error);
  } finally {
    process.exit(0);
  }
}

run();
