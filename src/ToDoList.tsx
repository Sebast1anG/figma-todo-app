import React, { useContext } from 'react';
import { HiChevronRight } from 'react-icons/hi';
import { IoIosCheckmark } from 'react-icons/io';
import { FaTrash } from 'react-icons/fa';
import { TaskContext } from './TaskProvider';

const ToDoList = () => {
    const context = useContext(TaskContext);
    if (!context) return null;

    const {
        tasks,
        taskInput,
        error,
        filter,
        setTaskInput,
        setError,
        setFilter,
        addTask,
        toggleTaskCompletion,
        deleteTask,
    } = context;

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
                />
            </div>

            <div className="flex mb-5 space-x-5">
                <button
                    onClick={() => setFilter('all')}
                    className={`${filterButtonBaseClasses} ${filter === 'all' ? activeFilterClasses : inactiveFilterClasses
                        } rounded-l-[8px] w-[120px] h-[36px] px-4`}
                >
                    Show all
                </button>

                <button
                    onClick={() => setFilter('active')}
                    className={`${filterButtonBaseClasses} ${filter === 'active' ? activeFilterClasses : inactiveFilterClasses
                        } rounded-r-[8px] w-[145px] h-[36px] px-2`}
                >
                    Hide completed
                </button>
            </div>

            <ul className="w-[285px] h-auto overflow-y-auto border border-gray-300 shadow-md rounded-md p-6">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <li key={task.id} className="flex items-center justify-between mb-2.5">
                            <div className="flex items-center">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleTaskCompletion(task.id)}
                                        className="w-4 h-4 border-2 rounded-md mr-2.5 appearance-none checked:bg-[#17A2B8] checked:border-[#17A2B8]"
                                    />
                                    {task.completed && (
                                        <IoIosCheckmark className="absolute top-0 left-0 w-4 h-4 text-white" />
                                    )}
                                </div>
                                <span
                                    onClick={() => toggleTaskCompletion(task.id)}
                                    className={`font-medium text-base cursor-pointer ${task.completed
                                        ? 'text-[#17A2B8] line-through'
                                        : 'text-[#6C757D]'
                                        }`}
                                >
                                    {task.text}
                                </span>
                            </div>
                            <button
                                onClick={() => deleteTask(task.id)}
                                className="text-red-500 text-xs hover:text-red-700 "
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
