const { pool } = require("../config/db");

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

exports.addHotel = async (name, location, rating, price) => {
  const values = [name, location, rating, price];

  const sqlQuery = `
  INSERT INTO hotels(name, location, rating, price) 
  VALUES($1, $2, $3, $4) RETURNING *;
  `;

  try {
    const result = await pool.query(sqlQuery, values);
    return result.rows[0];
  } catch (error) {
    console.error("Add hotel in service Error:", error);
    throw error;
  }
};
