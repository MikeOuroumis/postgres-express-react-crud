const express = require("express");
const cors = require("cors");
const app = express();
const hotelRoutes = require("./routes/hotelRoutes");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const requestLogger = require("./middlewares/requestLogger");

app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

// Route Handlers
app.use(hotelRoutes);
app.use(authRoutes);

module.exports = app;
