import React from 'react';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function Header({ month, year, onPrevMonth, onNextMonth }) {
  return (
    <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
      <button onClick={onPrevMonth} className="text-2xl">←</button>
      <h1 className="text-2xl font-bold">{monthNames[month]} {year}</h1>
      <button onClick={onNextMonth} className="text-2xl">→</button>
    </div>
  );
}
