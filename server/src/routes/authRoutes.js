const { Router } = require("express");
const authController = require("../controllers/authController");
const {
  validateRegistration,
  validateLogin,
} = require("../middlewares/validationMiddleware");

const router = Router();

router.post("/register", validateRegistration, authController.registerUser);
router.post("/login", validateLogin, authController.login);
router.post("/refresh", authController.refresh);

module.exports = router;
