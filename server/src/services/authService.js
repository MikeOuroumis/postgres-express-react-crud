const bcrypt = require("bcryptjs");
const pool = require("../config/db");
const jwt = require("jsonwebtoken");

exports.registerUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    "INSERT INTO users(email, password) VALUES ($1, $2)",
    [email, hashedPassword]
  );

  return result.rows[0];
};

exports.login = async (email, password) => {
  const userResult = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);

  if (userResult.rows.length === 0) {
    throw new Error("Invalid email or password");
  }

  const user = userResult.rows[0];

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
};
