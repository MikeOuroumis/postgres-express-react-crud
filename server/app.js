const express = require("express");
const cors = require("cors");
const hotels = require("./hotels");
const app = express();
const port = 4000;

app.use(cors());

app.get("/hotels", async (req, res) => {
  try {
    const { sortedBy, order, searchQuery } = req.query;

    const sortedHotels = sortHotels(hotels, sortedBy, order);
    const filteredHotels = sortedHotels.filter((hotel) =>
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    res.json(filteredHotels);
  } catch (err) {
    console.error("Internal server error");
  }
});

app.listen(port, () => {
  console.log("App is running on port 4000");
});

function sortHotels(hotels, sortedBy, order) {
  const sortedHotels = [...hotels];
  const ascendingMultiplier = order === "asc" ? 1 : -1;
  if (sortedBy === "name") {
    sortedHotels.sort((a, b) => {
      if (a.name < b.name) return -1 * ascendingMultiplier;
      if (a.name > b.name) return 1 * ascendingMultiplier;
      return 0;
    });
  } else if (sortedBy === "location") {
    sortedHotels.sort((a, b) => {
      if (a.location < b.location) return -1 * ascendingMultiplier;
      if (a.location > b.location) return 1 * ascendingMultiplier;
      return 0;
    });
  }
  return sortedHotels;
}
