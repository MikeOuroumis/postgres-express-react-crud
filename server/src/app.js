const express = require("express");
const cors = require("cors");
const app = express();
const hotelRoutes = require("./routes/hotelRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(cors());

app.use(express.json());

app.use(hotelRoutes);
app.use(authRoutes);

module.exports = app;
