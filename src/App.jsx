import React from "react";
import { TaskProvider } from "./components/TaskContext";
import ManageTasks from "./components/ManageTasks";

function App() {
  return (
    <TaskProvider> {/* ✅ Provides global task context */}
    <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-4">Task Management App</h1>
        <ManageTasks /> {/* ✅ Uses tasks from TaskContext */}
    </div>
</TaskProvider>
  );
}

export default App;
