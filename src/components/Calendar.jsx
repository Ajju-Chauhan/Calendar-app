import React from 'react';

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function isToday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export default function Calendar({ month, year, events, onAddEvent, onEditEvent }) {
  const daysInMonth = getDaysInMonth(year, month);
  const startDay = new Date(year, month, 1).getDay();
  const calendarDays = [];

  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(new Date(year, month, d));
  }

  const getEventsForDate = (date) => {
    return events.filter(e => new Date(e.date).toDateString() === date.toDateString());
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="p-4">
      {/* Days header */}
      <div className="grid grid-cols-7 gap-2 text-center font-semibold mb-2">
        {daysOfWeek.map((day, idx) => (
          <div key={idx} className="text-gray-600">{day}</div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((date, idx) => (
          <div
            key={idx}
            className="border h-24 p-1 flex flex-col cursor-pointer rounded hover:bg-blue-50"
            onClick={() => date && onAddEvent(date)}
          >
            {date && (
              <>
                <div className={`text-right ${isToday(date) ? 'text-blue-600 font-bold' : ''}`}>
                  {date.getDate()}
                </div>
                <div className="text-xs overflow-auto">
                  {getEventsForDate(date).map(ev => (
                    <div
                      key={ev.id}
                      className="bg-blue-100 p-1 mt-1 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditEvent(ev);
                      }}
                    >
                      {ev.title}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
