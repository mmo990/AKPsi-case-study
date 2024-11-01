import React from 'react';
import './App.css';

const events = [
  { date: 2, text: 'Do Laundry', color: 'orange' },
  { date: 4, text: 'Work On Case Study', color: 'blue' },
  { date: 8, text: 'Wash Dishes', color: 'orange' },
  { date: 11, text: 'Clean Bathroom', color: 'orange' },
  { date: 14, text: 'Work On Case Study', color: 'blue' },
  { date: 16, text: 'Brother Interview', color: 'blue' },
  { date: 16, text: 'Walk Dog', color: 'orange' },
  { date: 18, text: 'Vacuum House', color: 'orange' },
  { date: 21, text: 'Brother Interview', color: 'blue' },
  { date: 21, text: 'Clean Room', color: 'orange' },
  { date: 22, text: 'Work On Case Study', color: 'blue' },
  { date: 23, text: 'Brother Interview', color: 'blue' },
  { date: 23, text: 'Grocery Shopping', color: 'orange' },
  { date: 25, text: 'Work On Case Study', color: 'blue' },
  { date: 25, text: 'Do Laundry', color: 'orange' },
  { date: 28, text: 'Brother Interview', color: 'blue' },
  { date: 28, text: 'Wash Dishes', color: 'orange' },
  { date: 29, text: 'Brother Interview', color: 'blue' },
  { date: 30, text: 'Walk the Dog', color: 'orange' },
];

const Calendar = () => {
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="calendar">
      <div className="header">November, 2024</div>
      <div className="grid">
        {daysInMonth.map(day => (
          <div key={day} className="day">
            <div className="date">{day}</div>
            <div className="events">
              {events
                .filter(event => event.date === day)
                .map((event, index) => (
                  <div
                    key={index}
                    className="event"
                    style={{ backgroundColor: event.color }}
                  >
                    {event.text}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Calendar />
    </div>
  );
}

export default App;
