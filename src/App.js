import { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import EventModal from './components/EventModal';
import React from 'react';

import "./index.css"

function App() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editEvent, setEditEvent] = useState(null);

  useEffect(() => {
    fetch('/events.json')
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error('Error loading events:', err));
  }, []);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleAddEvent = (date) => {
    setSelectedDate(date);
    setEditEvent(null);
    setShowModal(true);
  };

  const handleEditEvent = (event) => {
    setSelectedDate(new Date(event.date));
    setEditEvent(event);
    setShowModal(true);
  };

  const handleSaveEvent = (eventData) => {
    if (editEvent) {
      setEvents(events.map((ev) => (ev.id === editEvent.id ? eventData : ev)));
    } else {
      setEvents([...events, { ...eventData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen">
      <div className="sm:flex-1">
        <Header 
          month={currentMonth} 
          year={currentYear} 
          onPrevMonth={prevMonth} 
          onNextMonth={nextMonth} 
        />
        <Calendar 
          month={currentMonth} 
          year={currentYear} 
          events={events} 
          onAddEvent={handleAddEvent} 
          onEditEvent={handleEditEvent} 
        />
      </div>
      
      {/* Sidebar should be hidden on mobile and only visible on larger screens */}
      <div className="sm:block sm:w-1/4">
        <Sidebar events={events} />
      </div>

      {showModal && 
        <EventModal 
          date={selectedDate} 
          onClose={() => setShowModal(false)} 
          onSave={handleSaveEvent} 
          existingEvent={editEvent}
        />}
    </div>
  );
}

export default App;
