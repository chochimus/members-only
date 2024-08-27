const pool = require("./pool");

async function insertUser({ username, password }) {
  const query = `INSERT INTO users (username, password) VALUES ($1, $2)`;
  const values = [username, password];
  await pool.query(query, values);
}

async function getAllMessages() {
  const query = `SELECT users.username AS author, title, text, timestamp
    FROM messages
    LEFT JOIN users ON messages.userid = users.userid
    ORDER BY timestamp DESC`;
  const { rows } = await pool.query(query);

  return rows;
}

async function createMessage({ userid, title, content }) {
  const query = `INSERT INTO messages (userid, title, text) VALUES ($1, $2, $3)`;
  const values = [userid, title, content];
  await pool.query(query, values);
}

module.exports = {
  insertUser,
  getAllMessages,
  createMessage,
};
