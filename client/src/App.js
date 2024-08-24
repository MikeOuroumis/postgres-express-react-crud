import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [hotels, setHotels] = useState([]);
  const [order, setOrder] = useState("asc");
  const [sortedBy, setSortedBy] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/hotels?order=${order}&sortedBy=${sortedBy}&searchQuery=${searchQuery}`
        );
        setHotels(await response.json());
      } catch (err) {
        console.error("Couldn't fetch hotels", err);
      }
    };

    fetchHotels();
  }, [order, sortedBy, searchQuery]);

  return (
    <div className="app-container">
      <div className="sort-controls">
        <button
          onClick={() => setSortedBy(sortedBy === "name" ? "location" : "name")}
        >
          sorted by {sortedBy}
        </button>
        <button onClick={() => setOrder(order === "asc" ? "desc" : "asc")}>
          order {order}
        </button>
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
      </div>
      <ul className="hotel-list">
        {hotels.map((hotel) => (
          <div className="hotel-item" key={hotel.id}>
            <h1 className="hotel-header">{hotel.name}</h1>
            <p className="hotel-location">{hotel.location}</p>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
