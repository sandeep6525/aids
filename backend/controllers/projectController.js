const { pool } = require('../config/db');

// Public - Get all projects
const getProjects = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM projects WHERE status = 'PUBLISHED' ORDER BY year DESC, id DESC");
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Public - Get single project
const getProjectById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM projects WHERE id = $1 AND status = 'PUBLISHED'", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Admin - Get all projects
const getAdminProjects = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY year DESC, id DESC');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Admin - Create
const createProject = async (req, res) => {
  const { title, description, problem_statement, solution, technologies, category, team_members, guide, year, thumbnail_url, github_url, demo_url, featured, status } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO projects (title, description, problem_statement, solution, technologies, category, team_members, guide, year, thumbnail_url, github_url, demo_url, featured, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
      [title, description, problem_statement, solution, technologies, category, team_members, guide, year, thumbnail_url, github_url, demo_url, featured, status]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Admin - Update
const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, problem_statement, solution, technologies, category, team_members, guide, year, thumbnail_url, github_url, demo_url, featured, status } = req.body;
  try {
    const result = await pool.query(
      `UPDATE projects SET title=$1, description=$2, problem_statement=$3, solution=$4, technologies=$5, category=$6, team_members=$7, guide=$8, year=$9, thumbnail_url=$10, github_url=$11, demo_url=$12, featured=$13, status=$14, updated_at=CURRENT_TIMESTAMP WHERE id=$15 RETURNING *`,
      [title, description, problem_statement, solution, technologies, category, team_members, guide, year, thumbnail_url, github_url, demo_url, featured, status, id]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Admin - Delete
const deleteProject = async (req, res) => {
  try {
    await pool.query('DELETE FROM projects WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getProjects, getProjectById, getAdminProjects, createProject, updateProject, deleteProject };
