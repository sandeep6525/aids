# Department of Artificial Intelligence Portal

A full-stack web application for a college's AI Department, built with React, Vite, Tailwind CSS, Express, and PostgreSQL.

## Features Completed
- Complete 10-page public frontend adhering to the Navy & Gold aesthetic.
- Full responsive design (mobile, tablet, desktop).
- Express.js backend foundation with REST API routing.
- PostgreSQL database integration for dynamic content.

## Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS v4, React Router DOM, Lucide React
- **Backend**: Node.js, Express.js, PostgreSQL (pg), CORS, Dotenv

## Setup & Execution

### 1. PostgreSQL Database Setup
Ensure PostgreSQL is installed and running on your system.
1. Create a database named `ai_department` (or specify your own in `.env`).
2. Update backend credentials. 

### 2. Environment Variables
Create a `.env` file in the `backend/` directory using `.env.example` as reference:
```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=ai_department
DB_PASSWORD=your_password
DB_PORT=5432
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 3. Initialize Database
Navigate to the backend directory and run the initialization script to safely create tables and populate demo data:
```bash
cd backend
npm install
node db/init.js
```

### 4. Start the Application

**Backend:**
```bash
cd backend
npm run dev 
# Starts on http://localhost:5000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
# Starts on http://localhost:5173
```

## API Endpoints Overview
- `GET /api/health` - API health check
- `GET /api/faculty` - List all active faculty (query: `designation`)
- `GET /api/events` - List all events (query: `type`, `status`)
- `GET /api/projects` - List all published projects (query: `category`, `year`)
- `GET /api/projects/featured` - List featured projects
- `GET /api/events/upcoming` - List upcoming events
