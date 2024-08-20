const pool = require("./pool");

async function insertUser({ username, password }) {
  const query = `INSERT INTO users (username, password) VALUES ($1, $2)`;
  const values = [username, password];
  await pool.query(query, values);
}
