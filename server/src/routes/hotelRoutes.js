const { Router } = require("express");
const hotelController = require("../controllers/hotelController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

router.get("/hotels", authMiddleware, hotelController.getHotels);
router.post("/hotels", hotelController.addHotel);

module.exports = router;
