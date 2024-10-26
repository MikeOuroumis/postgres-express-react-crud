import React, { useEffect, useState } from "react";

export function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [order, setOrder] = useState("asc");
  const [sortedBy, setSortedBy] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/hotels?order=${order}&sortedBy=${sortedBy}&searchQuery=${searchQuery}&page=${page}&limit=10`
        );
        const data = await response.json();
        setHotels(data.data);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Couldn't fetch hotels", err);
      }
    };

    fetchHotels();
  }, [order, sortedBy, searchQuery, page]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

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
          placeholder="Search hotels"
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
      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={page <= 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={page >= totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
