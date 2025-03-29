import { createContext, useContext, useState } from "react";

const TaskContext = createContext();//api to create context
export const useTask = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    const addTask = (title, description) => {
        setTasks([...tasks, {title, description, status: "To Do" }]);
    };

    const updateTaskStatus = (taskId, newStatus) => {
        setTasks(tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTaskStatus, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};

