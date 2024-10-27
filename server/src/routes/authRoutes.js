const { Router } = require("express");
const authController = require("../controllers/authController");
const { valiidateRegistration } = require("../middlewares/authMiddleware");

const router = Router();

router.post("/register", valiidateRegistration, authController.registerUser);
router.post("/login", authController.login);

module.exports = router;
