const express = require("express");
const cors = require("cors");
const hotels = require("./hotels");
const app = express();
const port = 4000;

app.use(cors());

app.get("/hotels", async (req, res) => {
  try {
    res.json(hotels);
  } catch (err) {
    console.error("Internal server error");
  }
});

app.listen(port, () => {
  console.log("App is running on port 4000");
});
