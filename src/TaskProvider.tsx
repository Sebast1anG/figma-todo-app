import React, { createContext, useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Task {
    id: string;
    text: string;
    completed: boolean;
}

type Filter = 'all' | 'active';

interface TaskContextType {
    tasks: Task[];
    taskInput: string;
    error: string | null;
    filter: Filter;
    setTaskInput: (input: string) => void;
    setFilter: (filter: Filter) => void;
    setError: (error: string | null) => void;
    addTask: () => void;
    toggleTaskCompletion: (id: string) => void;
    deleteTask: (id: string) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [taskInput, setTaskInput] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<Filter>('all');

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = useCallback(() => {
        if (taskInput.trim() === '') {
            setError('Task cannot be empty');
            return;
        }
        setTasks(prevTasks => [
            ...prevTasks,
            { id: uuidv4(), text: taskInput.trim(), completed: false },
        ]);
        setTaskInput('');
        setError(null);
    }, [taskInput]);

    const toggleTaskCompletion = useCallback((id: string) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    }, []);

    const deleteTask = useCallback((id: string) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    }, []);

    const filteredTasks = filter === 'all' ? tasks : tasks.filter(task => !task.completed);

    return (
        <TaskContext.Provider
            value={{
                tasks: filteredTasks,
                taskInput,
                error,
                filter,
                setTaskInput,
                setFilter,
                setError,
                addTask,
                toggleTaskCompletion,
                deleteTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};
