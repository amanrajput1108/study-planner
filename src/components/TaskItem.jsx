import { useTasks } from '../context/TaskContext';

export default function TaskItem({ task }) {
  const { toggleTask, deleteTask } = useTasks();

  const getPriorityColor = (p) => {
    switch (p) {
      case 'High': return 'var(--danger)';
      case 'Medium': return 'var(--warning)';
      case 'Low': return 'var(--success)';
      default: return 'var(--primary)';
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-left">
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />
          <span className="checkmark"></span>
        </label>

        <div className="task-content">
          <p className="task-text">{task.text}</p>
          <div className="task-meta">
            <span className="task-category">{task.category}</span>
            {task.dueDate && (
              <span className="task-date">
                <span className="icon">📅</span>
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>
      <button onClick={() => deleteTask(task.id)} className="btn-delete" aria-label="Delete task">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
      </button>

      <style jsx>{`
        .task-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.03);
          padding: 1.25rem;
          margin-bottom: 1rem;
          border-radius: var(--border-radius);
          transition: var(--transition);
          border: 1px solid rgba(255, 255, 255, 0.05);
          animation: slideIn 0.3s ease-out forwards;
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .task-item:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .task-item.completed {
          opacity: 0.6;
          background: transparent;
          border-style: dashed;
        }

        .task-item.completed .task-text {
          text-decoration: line-through;
          color: var(--text-secondary);
        }

        .task-left {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        /* Custom Checkbox */
        .checkbox-container {
          display: block;
          position: relative;
          padding-left: 24px;
          cursor: pointer;
          user-select: none;
        }

        .checkbox-container input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        .checkmark {
          position: absolute;
          top: -12px;
          left: 0;
          height: 24px;
          width: 24px;
          border: 2px solid var(--text-secondary);
          border-radius: 50%;
          transition: var(--transition);
        }

        .checkbox-container:hover input ~ .checkmark {
          border-color: var(--primary);
        }

        .checkbox-container input:checked ~ .checkmark {
          background-color: var(--primary);
          border-color: var(--primary);
        }

        .checkmark:after {
          content: "";
          position: absolute;
          display: none;
        }

        .checkbox-container input:checked ~ .checkmark:after {
          display: block;
        }

        .checkbox-container .checkmark:after {
          left: 8px;
          top: 4px;
          width: 5px;
          height: 10px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        .task-text {
          font-weight: 500;
          font-size: 1.05rem;
          margin-bottom: 0.4rem;
        }

        .task-meta {
          font-size: 0.85rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .task-category {
          background: rgba(139, 92, 246, 0.15);
          color: var(--primary);
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .task-date {
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        
        .icon {
          font-size: 0.9em;
        }

        .btn-delete {
          color: var(--text-secondary);
          padding: 0.5rem;
          border-radius: 8px;
          opacity: 0;
          transform: translateX(10px);
          transition: var(--transition);
        }
        
        .task-item:hover .btn-delete {
          opacity: 1;
          transform: translateX(0);
        }

        .btn-delete:hover {
          color: var(--danger);
          background: rgba(239, 68, 68, 0.1);
        }
      `}</style>
    </div>
  );
}
