const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'ai_department',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

const createTables = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS faculty (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      designation VARCHAR(100) NOT NULL,
      qualification VARCHAR(255),
      experience INT,
      specialization VARCHAR(255),
      subjects TEXT,
      research_interests TEXT,
      email VARCHAR(255),
      linkedin_url VARCHAR(255),
      orcid_url VARCHAR(255),
      photo_url TEXT,
      bio TEXT,
      is_active BOOLEAN DEFAULT true,
      display_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      event_type VARCHAR(50) NOT NULL,
      event_date DATE NOT NULL,
      start_time TIME,
      end_time TIME,
      venue VARCHAR(255),
      speaker VARCHAR(255),
      speaker_designation VARCHAR(255),
      poster_url TEXT,
      registration_url VARCHAR(255),
      registration_deadline TIMESTAMP,
      contact_person VARCHAR(255),
      status VARCHAR(20) DEFAULT 'UPCOMING',
      featured BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      problem_statement TEXT,
      solution TEXT,
      technologies TEXT,
      category VARCHAR(50) NOT NULL,
      team_members TEXT,
      guide VARCHAR(255),
      year INT NOT NULL,
      thumbnail_url TEXT,
      github_url VARCHAR(255),
      demo_url VARCHAR(255),
      research_paper_url VARCHAR(255),
      featured BOOLEAN DEFAULT false,
      status VARCHAR(20) DEFAULT 'PUBLISHED',
      display_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL,
      is_active BOOLEAN DEFAULT true,
      last_login_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

      CREATE TABLE IF NOT EXISTS activity_logs (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE SET NULL,
        action VARCHAR(255) NOT NULL,
        module VARCHAR(100),
        record_id INT,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS home_slider (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255),
          subtitle VARCHAR(255),
          description TEXT,
          media_type VARCHAR(50), 
          media_url TEXT,
          poster_url TEXT,
          mobile_media_url TEXT,
          button_text VARCHAR(100),
          button_url VARCHAR(255),
          secondary_button_text VARCHAR(100),
          secondary_button_url VARCHAR(255),
          display_order INT DEFAULT 0,
          is_active BOOLEAN DEFAULT true,
          is_featured BOOLEAN DEFAULT false,
          start_date TIMESTAMP,
          end_date TIMESTAMP,
          created_by INT REFERENCES users(id) ON DELETE SET NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS achievements (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          student_name VARCHAR(255) NOT NULL,
          student_register_number VARCHAR(100),
          achievement_type VARCHAR(100),
          competition VARCHAR(255),
          organization VARCHAR(255),
          position VARCHAR(100),
          achievement_date DATE,
          description TEXT,
          certificate_url TEXT,
          image_url TEXT,
          category VARCHAR(100),
          status VARCHAR(50) DEFAULT 'PENDING_REVIEW',
          submitted_by VARCHAR(255),
          reviewed_by INT REFERENCES users(id) ON DELETE SET NULL,
          approved_by INT REFERENCES users(id) ON DELETE SET NULL,
          is_featured BOOLEAN DEFAULT false,
          is_published BOOLEAN DEFAULT false,
          display_order INT DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS placement_statistics (
          id SERIAL PRIMARY KEY,
          placement_year INT UNIQUE NOT NULL,
          total_students INT,
          placed_students INT,
          placement_percentage DECIMAL(5, 2),
          highest_package DECIMAL(10, 2),
          average_package DECIMAL(10, 2),
          lowest_package DECIMAL(10, 2),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS placement_students (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          programme VARCHAR(255),
          graduation_year INT NOT NULL,
          company VARCHAR(255) NOT NULL,
          package DECIMAL(10, 2),
          role VARCHAR(255),
          photo_url TEXT,
          is_featured BOOLEAN DEFAULT false,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS recruiting_companies (
          id SERIAL PRIMARY KEY,
          company_name VARCHAR(255) NOT NULL,
          logo_url TEXT,
          website_url VARCHAR(255),
          industry VARCHAR(100),
          is_active BOOLEAN DEFAULT true,
          display_order INT DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS research_publications (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          journal_conference VARCHAR(255),
          authors TEXT NOT NULL,
          doi VARCHAR(255),
          publication_date DATE,
          research_area VARCHAR(255),
          abstract TEXT,
          pdf_url TEXT,
          external_url VARCHAR(255),
          is_featured BOOLEAN DEFAULT false,
          is_published BOOLEAN DEFAULT true,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS gallery_albums (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          cover_image_url TEXT,
          event_name VARCHAR(255),
          event_date DATE,
          category VARCHAR(100),
          is_published BOOLEAN DEFAULT true,
          display_order INT DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS gallery_images (
          id SERIAL PRIMARY KEY,
          album_id INT REFERENCES gallery_albums(id) ON DELETE CASCADE,
          image_url TEXT NOT NULL,
          caption VARCHAR(255),
          alt_text VARCHAR(255),
          display_order INT DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS alumni (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          graduation_year INT NOT NULL,
          programme VARCHAR(255),
          company VARCHAR(255),
          designation VARCHAR(255),
          location VARCHAR(255),
          profile_photo_url TEXT,
          linkedin_url VARCHAR(255),
          bio TEXT,
          is_featured BOOLEAN DEFAULT false,
          is_published BOOLEAN DEFAULT false,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS downloads (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          file_url TEXT NOT NULL,
          category VARCHAR(100),
          upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          is_published BOOLEAN DEFAULT true,
          download_count INT DEFAULT 0,
          display_order INT DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS contact_messages (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50),
          subject VARCHAR(255),
          message TEXT NOT NULL,
          status VARCHAR(50) DEFAULT 'UNREAD',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS website_settings (
          id SERIAL PRIMARY KEY,
          key VARCHAR(255) UNIQUE NOT NULL,
          value JSONB,
          description TEXT,
          updated_by INT REFERENCES users(id) ON DELETE SET NULL,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS announcements (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          content TEXT NOT NULL,
          category VARCHAR(100),
          announcement_date DATE DEFAULT CURRENT_DATE,
          attachment_url TEXT,
          priority VARCHAR(50) DEFAULT 'NORMAL',
          is_featured BOOLEAN DEFAULT false,
          is_published BOOLEAN DEFAULT true,
          expiry_date TIMESTAMP,
          created_by INT REFERENCES users(id) ON DELETE SET NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS programmes (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          duration VARCHAR(50),
          description TEXT,
          is_active BOOLEAN DEFAULT true,
          display_order INT DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS courses (
          id SERIAL PRIMARY KEY,
          programme_id INT REFERENCES programmes(id) ON DELETE CASCADE,
          semester VARCHAR(50) NOT NULL,
          code VARCHAR(50) NOT NULL,
          course VARCHAR(255) NOT NULL,
          type VARCHAR(50),
          credits INT,
          pdf_url TEXT,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
  try {
    await pool.query(query);
    console.log('Tables created successfully');
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
    } else {
      console.error('Error creating tables:', err);
    }
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Check if data exists
    const facultyCount = await pool.query('SELECT COUNT(*) FROM faculty');
    if (parseInt(facultyCount.rows[0].count) > 0) {
      console.log('Database already seeded. Skipping.');
      return;
    }

    const facultyQuery = `
      INSERT INTO faculty (name, designation, qualification, specialization, photo_url) VALUES 
      ('Dr. R. Kumar', 'Professor & HOD', 'Ph.D. in Machine Learning', 'Machine Learning, Deep Learning', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'),
      ('Dr. Priya Sharma', 'Associate Professor', 'Ph.D. in NLP', 'Natural Language Processing', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'),
      ('S. Nithya', 'Assistant Professor', 'M.Tech', 'Generative AI', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')
    `;
    await pool.query(facultyQuery);

    const eventQuery = `
      INSERT INTO events (title, event_type, event_date, start_time, end_time, venue, status, poster_url) VALUES 
      ('AI Workshop 2026', 'WORKSHOP', '2026-09-25', '10:00:00', '16:00:00', 'Seminar Hall', 'UPCOMING', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
      ('Guest Lecture on LLMs', 'GUEST_LECTURE', '2026-10-06', '11:00:00', '13:00:00', 'Main Auditorium', 'UPCOMING', 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')
    `;
    await pool.query(eventQuery);

    const projectQuery = `
      INSERT INTO projects (title, description, technologies, category, year, thumbnail_url, featured) VALUES 
      ('AI-based Crop Disease Detection', 'A deep learning model to identify diseases in crops.', 'Python, Deep Learning', 'MACHINE_LEARNING', 2026, 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true),
      ('Chatbot using Generative AI', 'A conversational AI built using RAG architecture.', 'NLP, LLM, Python', 'NLP', 2026, 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true)
    `;
    await pool.query(projectQuery);

    console.log('Seed data inserted successfully');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    pool.end();
  }
};

const initDb = async () => {
  await createTables();
  await seedData();
};

initDb();
