import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch("http://localhost:4000/hotels");
        setHotels(await response.json());
      } catch (err) {
        console.error("Couldn't fetch hotels", err);
      }
    };

    fetchHotels();
  }, []);

  return (
    <div className="app-container">
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
