const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool();

const seed = async () => {
  try {
    await pool.query(`
      INSERT INTO home_slider (title, subtitle, description, media_type, media_url, button_text, button_url, is_active, is_featured) 
      VALUES ('Department of Artificial Intelligence', 'WELCOME TO', 'Building future-ready professionals through quality education, research, innovation and real-world applications in Artificial Intelligence.', 'IMAGE', 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', 'Explore Department', '/about', true, true)
    `);
    console.log('Seeded home slider');
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
};

seed();
