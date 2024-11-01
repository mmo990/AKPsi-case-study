import React from 'react';
import './App.css';

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = ({ tasks }) => {
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="calendar">
      <div className="header">November, 2024</div>
      <div className="weekdays">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="weekday">
            {day}
          </div>
        ))}
      </div>
      <div className="grid">
        {daysInMonth.map(day => (
          <div key={day} className="day">
            <div className="date">{day}</div>
            <div className="events">
              {tasks
                .filter(task => task.date === day)
                .map((task, index) => (
                  <div
                    key={index}
                    className="event"
                    style={{ backgroundColor: task.color }}
                  >
                    {task.text}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;