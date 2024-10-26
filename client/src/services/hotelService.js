export async function saveHotel(name, location, rating, price) {
  try {
    const response = await fetch("http://localhost:4000/hotels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, location, rating, price }),
    });

    if (!response.ok) {
      throw new Error("Failed to save hotel");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
