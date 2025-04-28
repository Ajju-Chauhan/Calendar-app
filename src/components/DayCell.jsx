import React from "react";

const DayCell = ({ day, events }) => {
  return (
    <div className="border p-4 h-24 flex flex-col justify-between rounded-lg hover:bg-gray-50">
      <div className="text-lg font-bold text-center text-gray-700">{day.date()}</div>
      <div className="text-xs text-blue-500 mt-2">
        {events.length > 0 ? (
          <span>{events[0].title}</span>
        ) : (
          <span className="text-gray-400">No events</span>
        )}
      </div>
    </div>
  );
};

export default DayCell;
