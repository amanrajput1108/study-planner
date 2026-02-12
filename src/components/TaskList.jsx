import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';

export default function TaskList() {
    const { tasks } = useTasks();

    if (tasks.length === 0) {
        return (
            <div className="empty-state">
                <p>No tasks yet. Add one to get started!</p>
                <style jsx>{`
          .empty-state {
            text-align: center;
            padding: 3rem;
            color: var(--text-secondary);
            background: var(--card-bg);
            border-radius: var(--border-radius);
            margin-top: 1rem;
            border: 1px dashed #27272a;
          }
        `}</style>
            </div>
        );
    }

    return (
        <div className="task-list">
            {tasks.map(task => (
                <TaskItem key={task.id} task={task} />
            ))}
            <style jsx>{`
        .task-list {
          display: flex;
          flex-direction: column;
        }
      `}</style>
        </div>
    );
}
