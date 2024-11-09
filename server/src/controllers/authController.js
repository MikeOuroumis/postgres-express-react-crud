const authService = require("../services/authService");

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.registerUser(email, password);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Failed to register user:", error);
    res.status(500).json({ message: "Error registering user" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await authService.login(
      email,
      password
    );

    // Set the refresh token in an HttpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // Prevents JavaScript access to the cookie
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: "Strict", // Helps mitigate CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    // Send the access token in the response
    res.status(200).json({ message: "Login successful", accessToken });
  } catch (error) {
    console.error("Failed to login", error);
    res.status(500).json({ message: "Error logging in" });
  }
};

exports.refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    // Get new tokens from the service
    const { accessToken, refreshToken: newRefreshToken } =
      await authService.refreshToken(refreshToken);

    // Set the new refresh token as an HttpOnly cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true, // Prevents access from JavaScript
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "Strict", // Helps prevent CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // Set expiration to match the refresh token's lifespan (7 days)
    });

    // Send the new access token in the response
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(403).json({ message: error.message });
  }
};
