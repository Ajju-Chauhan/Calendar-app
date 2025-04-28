import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Calendar from "./components/Calendar";
import "./index.css";

const App = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Failed to load events", err));
  }, []);

  const handlePrevious = () => {
    setCurrentMonth((prev) => prev.subtract(1, "month"));
  };

  const handleNext = () => {
    setCurrentMonth((prev) => prev.add(1, "month"));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handlePrevious}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Previous
          </button>

          <h2 className="text-2xl font-bold text-gray-800">
            {currentMonth.format("MMMM YYYY")}
          </h2>

          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Next
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <Calendar currentMonth={currentMonth} events={events} />
        </div>
      </div>
    </div>
  );
};

export default App;
