import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [slots, setSlots] = useState({
    slot1: 0,
    slot2: 0,
    slot3: 0
  });

  const ESP32_IP = "http://192.168.1.62/data";

  useEffect(() => {
    const fetchData = () => {
      fetch("http://192.168.1.62/data")
        .then(res => res.json())
        .then(data => {
          console.log(data);  // for debugging
          setSlots(data);
        })
        .catch(err => console.log(err));
    };

    fetchData(); // fetch immediately on load

    const interval = setInterval(fetchData, 1000); // fetch every 1 second

    return () => clearInterval(interval); // cleanup when component unmounts
  }, []);

  const isOccupied = (distance) => {
    return Number(distance) < 15;
  };

  return (
    <div className="container">

      <h1>Smart Parking</h1>

      <div className="slot">
        Slot 1: {isOccupied(slots.slot1) ? "🔴 Occupied" : "🟢 Empty"}
      </div>

      <div className="slot">
        Slot 2: {isOccupied(slots.slot2) ? "🔴 Occupied" : "🟢 Empty"}
      </div>

      <div className="slot">
        Slot 3: {isOccupied(slots.slot3) ? "🔴 Occupied" : "🟢 Empty"}
      </div>

    </div>
  );
}

export default App;