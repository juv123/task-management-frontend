import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"; 

const TaskContext = createContext();
export const useTask = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = "http://localhost:8000/api/tasks"; // laravel api 

    // Fetch tasks from Laravel API 
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(API_URL);
                setTasks(response.data); 
            } catch (err) {
                setError("Failed to load tasks");
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    // Add a new task (POST request to Laravel API)
    const addTask = async (title, description) => {
        try {
            const response = await axios.post(API_URL, { title, description, status: "To Do" });
            setTasks([...tasks, response.data]); 
        } catch (err) {
            console.error("Error adding task:", err);
        }
    };

    // Update task status (PUT request to Laravel API)
    const updateTaskStatus = async (taskId, newStatus) => {
        try {
            await axios.put(`${API_URL}/${taskId}`, { status: newStatus });
            setTasks(tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
        } catch (err) {
            console.error("Error updating task status:", err);
        }
    };

    // Delete a task (DELETE request to Laravel API)
    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`${API_URL}/${taskId}`);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTaskStatus, deleteTask, loading, error }}>
            {children}
        </TaskContext.Provider>
    );
};
