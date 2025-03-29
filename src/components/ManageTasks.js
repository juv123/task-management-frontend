import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion } from "framer-motion";
import { useTask } from "./TaskContext";

const TaskCard = ({ task }) => {
    const { deleteTask } = useTask();
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "TASK",
        item: task,
        collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
    }));

    return (
        <motion.div 
            ref={drag}
            className={`p-2 mb-2 border rounded bg-white shadow cursor-pointer ${isDragging ? "opacity-50" : "opacity-100"}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <strong>{task.title}</strong>
            <p>{task.description}</p>
            <button onClick={() => deleteTask(task.id)} className="bg-red-500 text-white px-2 py-1 rounded mt-2">
                Delete
            </button>
        </motion.div>
    );
};

const TaskColumn = ({ status }) => {
    const { tasks, updateTaskStatus } = useTask();
    const [, drop] = useDrop(() => ({
        accept: "TASK",
        drop: (task) => updateTaskStatus(task.id, status),
    }));

    return (
        <motion.div 
            ref={drop}
            className="p-4 border rounded bg-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="font-bold text-lg mb-2">{status}</h3>
            {tasks.filter(task => task.status === status).map(task => (
                <TaskCard key={task.id} task={task} />
            ))}
        </motion.div>
    );
};

const ManageTasks = () => {
    const { addTask } = useTask();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
        <DndProvider backend={HTML5Backend}>
            <motion.div className="p-6">
                <h2 className="text-xl font-bold mb-4">Task Management</h2>

                <motion.div className="mb-4" initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
                    <input type="text" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 rounded w-full mb-2" />
                    <textarea placeholder="Task Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 rounded w-full mb-2" />
                    <button onClick={() => { addTask(title, description); setTitle(""); setDescription(""); }} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Add Task
                    </button>
                </motion.div>

                <div className="grid grid-cols-3 gap-4">
                    {["To Do", "In Progress", "Done"].map(status => (
                        <TaskColumn key={status} status={status} />
                    ))}
                </div>
            </motion.div>
        </DndProvider>
    );
};

export default ManageTasks;
