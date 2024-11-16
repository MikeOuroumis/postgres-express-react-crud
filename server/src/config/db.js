const { Pool } = require("pg");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

dotenv.config();

// Configure the PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "hotels_practice",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

const prisma = new PrismaClient();

module.exports = { pool, prisma };
