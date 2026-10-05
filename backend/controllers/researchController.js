const { pool } = require('../config/db');

// Public
const getResearch = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM research_publications WHERE is_published = true ORDER BY publication_date DESC");
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Admin
const getAdminResearch = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM research_publications ORDER BY publication_date DESC');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const createResearch = async (req, res) => {
  const { title, journal_conference, authors, doi, publication_date, research_area, abstract, pdf_url, external_url, is_featured, is_published } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO research_publications (title, journal_conference, authors, doi, publication_date, research_area, abstract, pdf_url, external_url, is_featured, is_published)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [title, journal_conference, authors, doi, publication_date, research_area, abstract, pdf_url, external_url, is_featured, is_published]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateResearch = async (req, res) => {
  const { id } = req.params;
  const { title, journal_conference, authors, doi, publication_date, research_area, abstract, pdf_url, external_url, is_featured, is_published } = req.body;
  try {
    const result = await pool.query(
      `UPDATE research_publications SET title=$1, journal_conference=$2, authors=$3, doi=$4, publication_date=$5, research_area=$6, abstract=$7, pdf_url=$8, external_url=$9, is_featured=$10, is_published=$11, updated_at=CURRENT_TIMESTAMP WHERE id=$12 RETURNING *`,
      [title, journal_conference, authors, doi, publication_date, research_area, abstract, pdf_url, external_url, is_featured, is_published, id]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const deleteResearch = async (req, res) => {
  try {
    await pool.query('DELETE FROM research_publications WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Research deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getResearch, getAdminResearch, createResearch, updateResearch, deleteResearch };
