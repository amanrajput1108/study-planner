import Layout from './components/Layout'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import CalendarView from './components/CalendarView'
import PomodoroTimer from './components/PomodoroTimer'

import Analytics from './components/Analytics'

function App() {
  return (
    <Layout>
      <div className="home-content">
        <header className="page-header">
          <h2>My Tasks</h2>
          <p className="subtitle">Manage your study goals</p>
        </header>

        <div className="dashboard-grid">
          <div className="main-column">
            <TaskForm />
            <TaskList />
          </div>
          <div className="side-column">
            <CalendarView />
            <PomodoroTimer />
            <Analytics />
          </div>
        </div>
      </div>
      <style jsx>{`
        .page-header {
          margin-bottom: 2rem;
        }
        .subtitle {
          color: var(--text-secondary);
        }
        .dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }
        .placeholder-card {
          background: var(--card-bg);
          padding: 1.5rem;
          border-radius: var(--border-radius);
          text-align: center;
          color: var(--text-secondary);
          border: 1px dashed #27272a;
          margin-bottom: 2rem;
        }
        @media (max-width: 900px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .page-header {
            margin-bottom: 1.5rem;
            text-align: center;
          }
        }
      `}</style>
    </Layout>
  )
}

export default App
