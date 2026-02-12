import { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export function useTasks() {
    return useContext(TaskContext);
}

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('study-planner-tasks');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('study-planner-tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (text, category = 'General', priority = 'Medium', dueDate = null) => {
        setTasks(prev => [{
            id: crypto.randomUUID(),
            text,
            category,
            priority,
            dueDate,
            completed: false,
            createdAt: new Date().toISOString()
        }, ...prev]);
    };

    const toggleTask = (id) => {
        setTasks(prev => prev.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    const updateTask = (id, updates) => {
        setTasks(prev => prev.map(task =>
            task.id === id ? { ...task, ...updates } : task
        ));
    };

    // derived state
    const activeTasks = tasks.filter(t => !t.completed);
    const completedTasks = tasks.filter(t => t.completed);

    return (
        <TaskContext.Provider value={{
            tasks,
            activeTasks,
            completedTasks,
            addTask,
            toggleTask,
            deleteTask,
            updateTask
        }}>
            {children}
        </TaskContext.Provider>
    );
}
