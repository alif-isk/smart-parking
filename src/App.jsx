import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [slots, setSlots] = useState({
    slot1: 0,
    slot2: 0,
    slot3: 0,
  });

  const isOccupied = (distance) => {
    return Number(distance) < 20; // threshold for occupancy
  };

  useEffect(() => {
    const fetchData = () => {
      fetch("http://192.168.1.59/data") // replace with your ESP32 IP
        .then((res) => res.json())
        .then((data) => setSlots(data))
        .catch((err) => console.log(err));
    };

    fetchData(); // immediate fetch
    const interval = setInterval(fetchData, 1000); // fetch every 1s
    return () => clearInterval(interval);
  }, []);

  return (

    
    <div className="container">
      <h1 className="header">Smart Parking System</h1>
      <div className="parking-lot">
        {["slot1", "slot2", "slot3"].map((slot, index) => (
          <div key={slot} className="parking-slot">
            {/* Slot label */}
            <p className="slot-label">Slot {index + 1}</p>

            {/* Occupancy indicator */}
            <div
              className={`indicator ${isOccupied(slots[slot]) ? "occupied" : "empty"}`}
            />

            {/* Distance */}
            <p className="distance">{slots[slot]} cm</p>

            {/* Optional: Occupied/Empty text */}
            <p className="status">{isOccupied(slots[slot]) ? "Occupied" : "Empty"}</p>
          </div>
        ))}
      </div>

      {/* Available spaces counter */}
      <p className="available">
        Available Spaces:{" "}
        {3 - ["slot1", "slot2", "slot3"].filter((s) => isOccupied(slots[s])).length}
      </p>
    </div>
  );
}

export default App;