const pool = require("../config/db");

exports.getHotels = async (req, res) => {
  try {
    const {
      sortedBy = "name",
      order = "asc",
      searchQuery = "",
      page = 1,
      limit = 10,
    } = req.query;

    const offset = (page - 1) * limit;
    const sqlQuery = `
            SELECT * FROM hotels
            WHERE LOWER(name) LIKE $1
            ORDER BY ${sortedBy} ${order}
            LIMIT $2 OFFSET $3;
          `;

    const values = [`%${searchQuery.toLowerCase()}%`, limit, offset];
    const result = await pool.query(sqlQuery, values);

    const countQuery = `
            SELECT COUNT(*) FROM hotels
            WHERE LOWER(name) LIKE $1;
          `;

    const countResult = await pool.query(countQuery, [
      `%${searchQuery.toLowerCase()}%`,
    ]);
    const totalResults = parseInt(countResult.rows[0].count, 10);

    res.json({
      data: result.rows,
      totalResults,
      totalPages: Math.ceil(totalResults / limit),
      currentPage: parseInt(page, 10),
    });
  } catch (err) {
    console.error("Internal server error", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
