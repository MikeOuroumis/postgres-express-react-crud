const hotelsService = require("../services/hotelService");

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

    const hotels = await hotelsService.fetchHotels(
      sortedBy,
      order,
      searchQuery,
      offset,
      limit
    );

    const totalResults = await hotelsService.countHotels(searchQuery);
    res.json({
      data: hotels,
      totalResults,
      totalPages: Math.ceil(totalResults / limit),
      currentPage: parseInt(page, 10),
    });
  } catch (err) {
    console.error("Internal server error", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addHotel = async (req, res) => {
  try {
    const { name, location, rating, price } = req.body;

    const hotel = await hotelsService.addHotel(name, location, rating, price);
    res
      .status(200)
      .json({ status: 200, message: "Hotel saved successfully", data: hotel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
