const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001;
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
  const validTables = ['Преподаватели', 'студенты'];

  if (!validTables.includes(table)) {
    return res.status(400).json({ error: 'Недопустимая таблица' });
  }

  try {
    const result = await pool.query(`SELECT * FROM vova."${table}"`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.listen(port, () => {
  console.log(`✅ Сервер работает на http://localhost:${port}`);
});
