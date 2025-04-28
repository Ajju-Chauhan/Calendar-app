import React from 'react';

export default function Sidebar({ events }) {
    return (
      <div className="w-64 border-l p-4 overflow-auto bg-gray-50">
        <h2 className="text-lg font-bold mb-2">Events</h2>
        {events.length === 0 && <p>No events</p>}
        {events.map(event => (
          <div key={event.id} className="bg-white p-2 mb-2 rounded shadow">
            <h3 className="font-bold">{event.title}</h3>
            <p className="text-sm">{event.date}</p>
            <p className="text-sm">{event.time} ({event.duration})</p>
          </div>
        ))}
      </div>
    );
  }
  