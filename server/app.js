const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();
const port = 4000;

app.use(cors());

app.get("/hotels", async (req, res) => {
  try {
    const { sortedBy = "name", order = "asc", searchQuery = "" } = req.query;

    // Fetch hotels from the database with sorting and filtering
    const sqlQuery = `
      SELECT * FROM hotels
      WHERE LOWER(name) LIKE $1
      ORDER BY ${sortedBy} ${order};
    `;

    const values = [`%${searchQuery.toLowerCase()}%`];

    const result = await pool.query(sqlQuery, values);

    res.json(result.rows);
  } catch (err) {
    console.error("Internal server error", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log("App is running on port 4000");
});

// function sortHotels(hotels, sortedBy, order) {
//   const sortedHotels = [...hotels];
//   const ascendingMultiplier = order === "asc" ? 1 : -1;
//   if (sortedBy === "name") {
//     sortedHotels.sort((a, b) => {
//       if (a.name < b.name) return -1 * ascendingMultiplier;
//       if (a.name > b.name) return 1 * ascendingMultiplier;
//       return 0;
//     });
//   } else if (sortedBy === "location") {
//     sortedHotels.sort((a, b) => {
//       if (a.location < b.location) return -1 * ascendingMultiplier;
//       if (a.location > b.location) return 1 * ascendingMultiplier;
//       return 0;
//     });
//   }
//   return sortedHotels;
// }
