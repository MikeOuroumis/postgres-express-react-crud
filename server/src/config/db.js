const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

// Configure the PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

module.exports = pool;
