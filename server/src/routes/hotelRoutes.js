const { Router } = require("express");
const hotelController = require("../controllers/hotelController");

const router = Router();

router.get("/hotels", hotelController.getHotels);
router.post("/hotels", hotelController.addHotel);

module.exports = router;
