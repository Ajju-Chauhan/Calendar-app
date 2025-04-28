import React from "react";
import dayjs from "dayjs";
import DayCell from "./DayCell";

const Calendar = ({ currentMonth, events }) => {
  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");
  const startDate = startOfMonth.startOf("week");
  const endDate = endOfMonth.endOf("week");

  let date = startDate;
  const days = [];

  // Use a while loop to generate all the day cells
  while (date.isBefore(endDate, "day") || date.isSame(endDate, "day")) {
    for (let i = 0; i < 7; i++) {
      const currentDate = dayjs(date); // Make a copy to avoid eslint no-loop-func warning

      const dayEvents = events.filter((e) =>
        dayjs(e.date).isSame(currentDate, "day")
      );

      days.push(
        <DayCell
          key={currentDate.format("YYYY-MM-DD")}
          day={currentDate}
          events={dayEvents}
        />
      );

      date = date.add(1, "day");
    }
  }

  return (
    <div className="p-4">
      {/* Header with Day Names */}
      <div className="grid grid-cols-7 gap-4 mb-2 text-center text-sm font-semibold text-gray-600">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="uppercase">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-4">
        {days}
      </div>
    </div>
  );
};

export default Calendar;
