import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { HiChevronRight } from 'react-icons/hi';
import { IoIosCheckmark } from 'react-icons/io';
import { FaTrash } from 'react-icons/fa';

interface Task {
    id: string;
    text: string;
    completed: boolean;
}

type Filter = 'all' | 'active';

const ToDoList = () => {
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

    const filteredTasks =
        filter === 'all' ? tasks : tasks.filter(task => !task.completed);

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    };

    const filterButtonBaseClasses =
        'rounded-md flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-0';
    const activeFilterClasses = 'bg-[#148F9A] text-white';
    const inactiveFilterClasses = 'bg-white text-[#54595E] border-[#DEE2E6] border';

    return (
        <div className="flex flex-col items-center w-[454px] h-auto font-semibold bg-white text-[#54595E] p-[113px_84px_0px_85px]">
            <div className="relative mb-4 w-full">
                <input
                    type="text"
                    value={taskInput}
                    onChange={(e) => {
                        setTaskInput(e.target.value);
                        if (error) setError(null);
                    }}
                    onKeyDown={handleKeyDown}
                    className={`border border-gray-300 rounded-[8px] w-full h-[48px] pl-4 pr-10 ${error
                        ? 'border-red-500 placeholder-red-500'
                        : 'placeholder-[#54595E]'
                        }`}
                    placeholder={error || 'New task input'}
                    aria-label="New task input"
                />
                <HiChevronRight
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl outline-0 text-gray-300 cursor-pointer hover:text-[#148F9A]"
                    onClick={addTask}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            addTask();
                        }
                    }}
                />
            </div>

            <div className="flex mb-5 space-x-5">
                <button
                    onClick={() => setFilter('all')}
                    className={`${filterButtonBaseClasses} ${filter === 'all' ? activeFilterClasses : inactiveFilterClasses
                        } rounded-l-[8px] w-[120px] h-[36px] px-4`}
                    aria-pressed={filter === 'all'}
                    aria-label="Show all tasks"
                >
                    Show all
                </button>

                <button
                    onClick={() => setFilter('active')}
                    className={`${filterButtonBaseClasses} ${filter === 'active' ? activeFilterClasses : inactiveFilterClasses
                        } rounded-r-[8px] w-[145px] h-[36px] px-2`}
                    aria-pressed={filter === 'active'}
                    aria-label="Hide completed tasks"
                >
                    Hide completed
                </button>
            </div>

            <ul className="w-[285px] h-auto overflow-y-auto border border-gray-300 shadow-md rounded-md p-6">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <li
                            key={task.id}
                            className="flex items-center justify-between mb-2.5"
                        >
                            <div className="flex items-center">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() =>
                                            toggleTaskCompletion(task.id)
                                        }
                                        className="w-4 h-4 border-2 rounded-md mr-2.5 appearance-none checked:bg-[#17A2B8] checked:border-[#17A2B8] flex items-center justify-center"
                                        aria-label={`Mark "${task.text}" as ${task.completed
                                            ? 'incomplete'
                                            : 'complete'
                                            }`}
                                    />
                                    {task.completed && (
                                        <IoIosCheckmark className="absolute top-0 left-0 w-4 h-4 text-white pointer-events-none" />
                                    )}
                                </div>
                                <span
                                    onClick={() => toggleTaskCompletion(task.id)}
                                    className={`font-medium text-base cursor-pointer ${task.completed
                                        ? 'text-[#17A2B8] line-through'
                                        : 'text-[#6C757D]'
                                        }`}
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            toggleTaskCompletion(task.id);
                                        }
                                    }}
                                    aria-label={`Task: ${task.text}`}
                                >
                                    {task.text}
                                </span>
                            </div>
                            <button
                                onClick={() => deleteTask(task.id)}
                                className="text-red-500 text-xs hover:text-red-700 "
                                aria-label={`Delete "${task.text}" task`}
                            >
                                <FaTrash />
                            </button>
                        </li>
                    ))
                ) : (
                    <li className="text-center text-gray-500">
                        No tasks to display.
                    </li>
                )}
            </ul>
        </div>
    );
};

export default ToDoList;
