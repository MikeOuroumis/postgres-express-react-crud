const express = require("express");
const app = express();
const port = 4000;

app.get("/", async (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("App is running on port 4000");
});
