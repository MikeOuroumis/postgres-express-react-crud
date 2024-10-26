const express = require("express");
const cors = require("cors");
const app = express();
const hotelRoutes = require("./routes/hotelRoutes");

app.use(cors());

app.use(hotelRoutes);

module.exports = app;
