const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();

app.use(cors());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '2468680', // 👉 укажи свой пароль
  port: 5432,
});

app.get('/api/data/:table', async (req, res) => {
  const { table } = req.params;
 

  try {
    const result = await pool.query(`SELECT * FROM vova."${table}"`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});


