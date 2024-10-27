const { Router } = require("express");
const authController = require("../controllers/authController");
const { valiidateRegistration } = require("../middlewares/authMiddleware");

const router = Router();

router.post("/register", valiidateRegistration, authController.registerUser);

module.exports = router;
