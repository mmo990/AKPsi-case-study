import React from 'react';
import './App.css'; // Ensure Calendar.css is imported

function Calendar({ tasks }) {
  // Helper function to get the days in the current month
  const getMonthDays = () => {
    const today = new Date();
    const monthDays = [];
    const year = today.getFullYear();
    const month = today.getMonth();

    // Get the number of days in the current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      monthDays.push({
        date: i,
        fullDate: new Date(year, month, i).toISOString().split('T')[0], // Add fullDate for accurate comparison
      });
    }

    return monthDays;
  };

  const monthDays = getMonthDays();

  return (
    <div className="calendar">
      <h2 className="calendar-title">Calendar</h2>
      <div className="calendar-grid">
        {monthDays.map(({ date, fullDate }) => (
          <div key={date} className="calendar-day">
            <div className="date">{date}</div>
            <div className="events">
              {tasks.filter(task => task.due_date === fullDate).map((task, index) => (
                <div
                  key={index}
                  className="event"
                  style={{ backgroundColor: task.color }}
                >
                  {task.taskName}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;