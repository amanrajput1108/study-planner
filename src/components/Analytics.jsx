import { useTasks } from '../context/TaskContext';

export default function Analytics() {
  const { tasks, completedTasks } = useTasks();

  const total = tasks.length;
  const completed = completedTasks.length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  const categories = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="analytics-card glass-panel">
      <div className="analytics-header">
        <h3>Your Progress</h3>
        <span className="analytics-badge">{completed}/{total} Tasks</span>
      </div>

      <div className="stats-grid">
        <div className="stat-box">
          <svg viewBox="0 0 36 36" className="circular-chart">
            <path className="circle-bg"
              d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path className="circle"
              strokeDasharray={`${percentage}, 100`}
              d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" className="percentage">{percentage}%</text>
          </svg>
          <span className="stat-label">Completion Rate</span>
        </div>
      </div>

      <div className="category-breakdown">
        <h4>Category Distribution</h4>
        <div className="category-list">
          {Object.entries(categories).map(([cat, count]) => (
            <div key={cat} className="category-item">
              <div className="cat-info">
                <span className="cat-name">{cat}</span>
                <span className="cat-count">{count} tasks</span>
              </div>
              <div className="cat-bar-bg">
                <div
                  className="cat-bar-fill"
                  style={{ width: `${(count / total) * 100}%`, backgroundColor: getCategoryColor(cat) }}
                ></div>
              </div>
            </div>
          ))}
          {total === 0 && <p className="empty-text">No data to display yet.</p>}
        </div>
      </div>

      <style jsx>{`
        .analytics-card {
          padding: 1.5rem;
          margin-top: 2rem;
        }
        .analytics-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
        }
        
        .analytics-badge {
            background: rgba(255,255,255,0.1);
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            font-size: 0.85rem;
            font-weight: 500;
        }

        .stats-grid {
            display: flex;
            justify-content: center;
            margin-bottom: 2rem;
        }

        .circular-chart {
          display: block;
          margin: 0 auto;
          max-width: 120px;
          max-height: 120px;
        }
        
        .circle-bg {
          fill: none;
          stroke: rgba(255,255,255,0.05);
          stroke-width: 2.5;
        }
        
        .circle {
          fill: none;
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke: var(--success);
          animation: progress 1s ease-out forwards;
        }
        
        @keyframes progress {
          0% { stroke-dasharray: 0 100; }
        }
        
        .percentage {
          fill: var(--text-primary);
          font-family: var(--font-family);
          font-weight: bold;
          font-size: 0.5em;
          text-anchor: middle;
        }
        
        .stat-label {
            display: block;
            text-align: center;
            margin-top: 0.5rem;
            color: var(--text-secondary);
            font-size: 0.9rem;
        }

        h4 {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .category-item {
          margin-bottom: 1rem;
        }
        
        .cat-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.3rem;
            font-size: 0.9rem;
        }
        
        .cat-count {
            color: var(--text-secondary);
            font-size: 0.8rem;
        }
        
        .cat-bar-bg {
            height: 6px;
            background: rgba(255,255,255,0.05);
            border-radius: 3px;
            overflow: hidden;
        }
        
        .cat-bar-fill {
            height: 100%;
            border-radius: 3px;
            transition: width 0.5s ease-out;
        }
        
        .empty-text {
            color: var(--text-secondary);
            font-style: italic;
            text-align: center;
            font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}

function getCategoryColor(category) {
  switch (category) {
    case 'Study': return 'var(--primary)';
    case 'Project': return 'var(--warning)';
    case 'Personal': return 'var(--success)';
    default: return '#cbd5e1';
  }
}
