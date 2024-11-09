const express = require("express");
const cors = require("cors");
const app = express();
const hotelRoutes = require("./routes/hotelRoutes");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const requestLogger = require("./middlewares/requestLogger");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

// Route Handlers
app.use(hotelRoutes);
app.use(authRoutes);

module.exports = app;
