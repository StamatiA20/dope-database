const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // or use host, user, password, etc.
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};