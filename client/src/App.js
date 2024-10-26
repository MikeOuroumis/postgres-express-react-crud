import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Hotels } from "./pages/Hotels";
import { AddHotel } from "./pages/AddHotel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hotels />} />
        <Route path="/add-hotel" element={<AddHotel />} />
      </Routes>
    </Router>
  );
}

export default App;
