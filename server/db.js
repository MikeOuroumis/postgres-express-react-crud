const { Pool } = require("pg");

// Configure the PostgreSQL connection
const pool = new Pool({
  user: "postgres", // Replace with your PostgreSQL username
  host: "localhost", // Replace with your host if different
  database: "postgres", // Replace with your database name
  password: "", // Replace with your PostgreSQL password
  port: 5432, // Default PostgreSQL port
});

module.exports = pool;
