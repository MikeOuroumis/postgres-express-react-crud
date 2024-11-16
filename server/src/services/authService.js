const bcrypt = require("bcryptjs");
const { pool } = require("../config/db");
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

  const user = userResult.rows[0];

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // Generate an access token with a short expiration
  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

exports.refreshToken = async (refreshToken) => {
  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Generate a new access token
    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Generate a new refresh token
    const newRefreshToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" } // Adjust the expiration as needed
    );

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (error) {
    // Throw an error to be handled by the controller
    throw new Error("Invalid or expired refresh token");
  }
};
