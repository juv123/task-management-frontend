import React from "react";
import ManageTasks from "./components/ManageTasks";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Task Management</h1>
      <ManageTasks />
    </div>
  );
}

export default App;
