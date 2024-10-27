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
    const token = await authService.login(email, password);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Failed to login", error);
    res.status(500).json({ error: "Error logging in" });
  }
};
