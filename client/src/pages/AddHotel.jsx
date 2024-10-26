import { useState } from "react";
import { saveHotel } from "../services/hotelService";

export function AddHotel() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Basic validation
      if (!name || !location || !rating || !price) {
        alert("Please fill out all fields");
        return;
      }

      await saveHotel(name, location, parseFloat(rating), parseFloat(price));

      resetFields();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetFields = () => {
    setName("");
    setLocation("");
    setRating("");
    setPrice("");
  };
  return (
    <>
      <form onSubmit={submit}>
        <h2>Add hotel</h2>
        <input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          placeholder="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <input
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "loading" : "submit"}
        </button>
      </form>
      {loading && <p>Saving hotel details, please wait...</p>}
    </>
  );
}
