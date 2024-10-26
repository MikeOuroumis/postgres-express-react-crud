const pool = require("../config/db");

exports.fetchHotels = async (sortedBy, order, searchQuery, offset, limit) => {
  const sqlQuery = `
  SELECT * FROM hotels
   WHERE LOWER(name) LIKE $1
   ORDER BY ${sortedBy} ${order}
   LIMIT $2 OFFSET $3 `;

  const values = [`%${searchQuery.toLowerCase()}%`, limit, offset];
  const result = await pool.query(sqlQuery, values);

  return result.rows;
};

exports.countHotels = async (searchQuery) => {
  const countQuery = `
    SELECT COUNT(*) FROM hotels
    WHERE LOWER(name) LIKE $1;
  `;

  const countResult = await pool.query(countQuery, [
    `%${searchQuery.toLowerCase()}%`,
  ]);
  const totalResults = parseInt(countResult.rows[0].count, 10);

  return totalResults;
};
