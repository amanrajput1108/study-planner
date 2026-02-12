import { useState } from 'react';
import { useTasks } from '../context/TaskContext';

export default function CalendarView() {
  const { tasks } = useTasks();
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  const getTasksForDate = (day) => {
    const dateStr = new Date(year, currentDate.getMonth(), day).toDateString();
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      const currentDayDate = new Date(year, currentDate.getMonth(), day);
      return taskDate.getDate() === currentDayDate.getDate() &&
        taskDate.getMonth() === currentDayDate.getMonth() &&
        taskDate.getFullYear() === currentDayDate.getFullYear();
    });
  };

  return (
    <div className="calendar-card glass-panel">
      <div className="calendar-header">
        <h3>{monthName} <span style={{ fontWeight: 400, opacity: 0.7 }}>{year}</span></h3>
        <div className="calendar-nav">
          <button onClick={() => changeMonth(-1)}>&lt;</button>
          <button onClick={() => changeMonth(1)}>&gt;</button>
        </div>
      </div>
      <div className="calendar-grid">
        <div className="day-name">S</div>
        <div className="day-name">M</div>
        <div className="day-name">T</div>
        <div className="day-name">W</div>
        <div className="day-name">T</div>
        <div className="day-name">F</div>
        <div className="day-name">S</div>
        {blanks.map((_, i) => <div key={`blank-${i}`} className="calendar-day empty"></div>)}
        {days.map(day => {
          const dayTasks = getTasksForDate(day);
          const hasTasks = dayTasks.length > 0;
          const isToday = new Date().toDateString() === new Date(year, currentDate.getMonth(), day).toDateString();

          return (
            <div key={day} className={`calendar-day ${isToday ? 'today' : ''} ${hasTasks ? 'has-tasks' : ''}`}>
              <span>{day}</span>
              {hasTasks && <div className="task-indicators">
                {dayTasks.slice(0, 3).map((t, i) => (
                  <div key={i} className="task-dot" style={{ backgroundColor: t.completed ? 'var(--success)' : 'var(--primary)' }}></div>
                ))}
              </div>}
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .calendar-card {
          padding: 1.5rem;
          margin-bottom: 2rem;
        }
        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .calendar-header h3 {
          margin: 0;
          font-size: 1.25rem;
          letter-spacing: -0.5px;
        }
        .calendar-nav button {
          color: var(--text-secondary);
          padding: 0.5rem;
          font-weight: bold;
          border-radius: 8px;
        }
        .calendar-nav button:hover {
          background: rgba(255,255,255,0.1);
          color: var(--primary);
        }
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.5rem;
          text-align: center;
        }
        .day-name {
          color: var(--text-secondary);
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }
        .calendar-day {
          padding: 0.5rem;
          border-radius: 12px;
          font-size: 0.9rem;
          position: relative;
          height: 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
          border: 1px solid transparent;
        }
        .calendar-day:hover:not(.empty) {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
        }
        .calendar-day.today {
          background: linear-gradient(135deg, var(--primary), #6d28d9);
          color: white;
          box-shadow: 0 4px 10px rgba(139, 92, 246, 0.4);
        }
        .task-indicators {
          display: flex;
          gap: 2px;
          margin-top: 2px;
        }
        .task-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
        }
        .calendar-day.today .task-dot {
          background: white !important;
        }
        @media (max-width: 480px) {
          .calendar-day {
            height: 2.5rem;
            font-size: 0.8rem;
          }
          .task-dot {
            width: 3px;
            height: 3px;
          }
          .calendar-header h3 {
             font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
