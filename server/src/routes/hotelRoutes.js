const { Router } = require("express");
const hotelController = require("../controllers/hotelController");

const router = Router();

router.get("/hotels", hotelController.getHotels);

module.exports = router;
