import React from "react";
import dayjs from "dayjs";

const Calendser = ({ currentMonth, events }) => {
  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");
  const startDate = startOfMonth.startOf("week"); // Start from the first day of the week
  const endDate = endOfMonth.endOf("week"); // End on the last day of the week

  let date = startDate.clone();
  const days = [];

  // Iterate through each day and generate the calendar cells
  while (date.isBefore(endDate, "day")) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const dayEvents = events.filter((e) => dayjs(e.date).isSame(date, "day"));

      // Add the day cell to the current week
      week.push(
        <div
          key={date.toString()}
          className={`col text-center p-3 border rounded-lg min-h-[120px] shadow-md transition-all duration-300 ${
            dayjs().isSame(date, "day") ? "bg-blue-100 border-blue-500" : "bg-white border-gray-200"
          }`}
        >
          {/* Day Number */}
          <div className="text-lg font-bold text-center text-gray-800 mt-2">
            {date.date()}
          </div>

          {/* Events Section */}
          <div className="flex flex-column gap-2 overflow-hidden">
            {/* Display first two events */}
            {dayEvents.slice(0, 2).map((e, idx) => (
              <div key={idx} className={`text-sm text-${idx % 2 === 0 ? "blue" : "green"}-500`}>
                {e.title}
              </div>
            ))}

            {/* If more than 2 events, show a message */}
            {dayEvents.length > 2 && (
              <span className="text-xs text-gray-500">+{dayEvents.length - 2} more</span>
            )}
          </div>
        </div>
      );
      date = date.add(1, "day");
    }
    // Add the week's days to the calendar
    days.push(
      <div key={date.toString()} className="row mb-2">
        {week}
      </div>
    );
  }

  return (
    <div className="container mt-5 p-4 bg-white rounded shadow-sm">
      {/* Days of the week header */}
      <div className="row text-center mb-3">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="col py-2 text-muted font-weight-bold">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar Days Grid */}
      <div className="row">
        {days}
      </div>
    </div>
  );
};

export default Calendser;
