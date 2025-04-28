import { useState } from 'react';
import React from 'react';


export default function EventModal({ date, onClose, onSave, existingEvent }) {
  const [title, setTitle] = useState(existingEvent?.title || '');
  const [time, setTime] = useState(existingEvent?.time || '');
  const [duration, setDuration] = useState(existingEvent?.duration || '');

  const handleSubmit = () => {
    onSave({
      id: existingEvent?.id || Date.now(),
      title,
      date: date.toISOString().split('T')[0],
      time,
      duration,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white p-4 sm:p-6 rounded shadow-lg w-full max-w-md sm:max-w-lg">
        <h2 className="text-lg sm:text-xl font-bold mb-4">{existingEvent ? 'Edit' : 'Add'} Event</h2>
        
        <input 
          type="text" 
          placeholder="Title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border w-full p-2 mb-3 rounded"
        />
        <input 
          type="text" 
          placeholder="Time (e.g., 10:00 AM)" 
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border w-full p-2 mb-3 rounded"
        />
        <input 
          type="text" 
          placeholder="Duration (e.g., 1h)" 
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border w-full p-2 mb-4 rounded"
        />
        
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save</button>
        </div>
      </div>
    </div>
  );
}
