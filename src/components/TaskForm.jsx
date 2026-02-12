import { useState } from 'react';
import { useTasks } from '../context/TaskContext';

export default function TaskForm() {
  const { addTask } = useTasks();
  const [text, setText] = useState('');
  const [category, setCategory] = useState('General');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTask(text, category, 'Medium', dueDate || null);
    setText('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form glass-panel">
      <div className="form-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What do you need to study?"
          className="task-input"
        />
      </div>
      <div className="form-row">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="task-select">
          <option value="General">General</option>
          <option value="Study">Study</option>
          <option value="Project">Project</option>
          <option value="Personal">Personal</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="task-date"
        />
        <button type="submit" className="btn-primary">
          <span>Add Task</span>
          <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        </button>
      </div>
      <style jsx>{`
        .task-form {
          padding: 1.5rem;
          margin-bottom: 2rem;
        }
        .form-group {
          margin-bottom: 1.25rem;
        }
        .task-input {
          width: 100%;
          font-size: 1.2rem;
          padding: 1rem 1.25rem;
        }
        .form-row {
          display: flex;
          gap: 1rem;
        }
        .task-select, .task-date {
          flex: 1;
        }
        .btn-primary {
          background: linear-gradient(135deg, var(--primary), var(--primary-hover));
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: var(--border-radius);
          font-weight: 600;
          transition: var(--transition);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(139, 92, 246, 0.5);
          filter: brightness(1.1);
        }
        .icon {
          width: 20px;
          height: 20px;
        }
        @media (max-width: 600px) {
          .form-row {
            flex-direction: column;
            gap: 0.75rem;
          }
          .task-form {
            padding: 1.25rem;
          }
          .task-input {
            font-size: 1rem;
          }
        }
      `}</style>
    </form>
  );
}
