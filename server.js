// server.js
const express = require("express");
const { Pool } = require("pg");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Route: get questions
app.get("/questions", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM questions ORDER BY RANDOM() LIMIT 10");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Route: submit answers
app.post("/submit", async (req, res) => {
  try {
    const { answers } = req.body;
    let score = 0;

    for (let ans of answers) {
      const result = await pool.query("SELECT correct_option FROM questions WHERE id=$1", [ans.id]);
      if (result.rows[0].correct_option === ans.answer) {
        score++;
      }
    }

    res.json({ score, total: answers.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error processing answers" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
