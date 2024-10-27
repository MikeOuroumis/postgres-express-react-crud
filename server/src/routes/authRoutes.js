const { Router } = require("express");
const authController = require("../controllers/authController");
const {
  validateRegistration,
  validateLogin,
} = require("../middlewares/authMiddleware");

const router = Router();

router.post("/register", validateRegistration, authController.registerUser);
router.post("/login", validateLogin, authController.login);

module.exports = router;
