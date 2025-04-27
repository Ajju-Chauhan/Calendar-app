import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Calendar from "./components/Calendar";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Failed to load events", err));
  }, []);

  return (
    <div className="min-vh-100 bg-light p-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <button
            className="btn btn-primary"
            onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
          >
            Previous
          </button>
          <h2 className="h4 fw-bold">
            {currentMonth.format("MMMM YYYY")}
          </h2>
          <button
            className="btn btn-primary"
            onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
          >
            Next
          </button>
        </div>
        <Calendar currentMonth={currentMonth} events={events} />
      </div>
    </div>
  );
};

export default App;
