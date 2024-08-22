const pool = require("./pool");

async function insertUser({ username, password }) {
  const query = `INSERT INTO users (username, password) VALUES ($1, $2)`;
  const values = [username, password];
  await pool.query(query, values);
}

async function getAllMessages() {
  const query = `SELECT * FROM messages`;
  const { rows } = await pool.query(query);
  return rows;
}

module.exports = {
  insertUser,
  getAllMessages,
};
