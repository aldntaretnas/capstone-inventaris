const router = require('express').Router();
const pool = require('../db');

//Endpoint (Read) untuk GET semua item beserta nama supplier
router.get('/api/items', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT i.*, s.name AS supplier_name
       FROM items i
       LEFT JOIN suppliers s ON s.id = i.supplier_id
       ORDER BY i.id`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Endpoint (Write) untuk POST tambah item baru
router.post('/api/items', async (req, res) => {
  try {
    const { name, category, price, stock, supplier_id } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO items (name, category, price, stock, supplier_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, category, price, stock, supplier_id]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;