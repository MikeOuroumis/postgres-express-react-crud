const prisma = require("../config/db");

exports.fetchHotels = async (sortedBy, order, searchQuery, offset, limit) => {
  const hotels = await prisma.hotel.findMany({
    where: {
      name: {
        contains: searchQuery || "", // Filters hotels with names containing `searchQuery`
        mode: "insensitive", // Case-insensitive search
      },
    },
    orderBy: {
      [sortedBy]: order.toLowerCase(), // Dynamically set the sort field and order
    },
    skip: parseInt(offset, 10) || 0, // Skips rows for pagination
    take: parseInt(limit, 10) || 10, // Limits the number of results
  });

  return hotels;
};

exports.countHotels = async (searchQuery) => {
  const totalResults = await prisma.hotel.count({
    where: {
      name: {
        contains: searchQuery,
        mode: "insensitive",
      },
    },
  });

  return totalResults;
};

exports.addHotel = async (name, location, rating, price) => {
  try {
    const newHotel = await prisma.hotel.create({
      data: {
        name,
        location,
        rating,
        price,
      },
    });
    return newHotel;
  } catch (error) {
    console.error("Add hotel in service Error:", error);
    throw error;
  }
};
