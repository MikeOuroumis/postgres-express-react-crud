const bcrypt = require("bcryptjs");
const pool = require("../config/db");

exports.registerUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    "INSERT INTO users(email, password) VALUES ($1, $2)",
    [email, hashedPassword]
  );

  return result.rows[0];
};
