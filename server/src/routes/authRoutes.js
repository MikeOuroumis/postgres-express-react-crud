const { Router } = require("express");
const authController = require("../controllers/authController");

const router = Router();

router.post("/register", authController.registerUser);

module.exports = router;
