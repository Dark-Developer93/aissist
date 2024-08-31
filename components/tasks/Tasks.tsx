"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const Tasks = () => {
  const tasks = useQuery(api.queries.tasks.get);

  return (
    <table className="border-collapse border border-gray-300 w-full">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2 w-1/2 font-bold bg-gray-100">
            Title
          </th>
          <th className="border border-gray-300 p-2 w-1/2 font-bold bg-gray-100">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {tasks?.map((task) => (
          <tr key={task.id}>
            <td className="border border-gray-300 p-2 w-1/2">{task.text}</td>
            <td className="border border-gray-300 p-2 w-1/2">
              {task.isCompleted ? "Completed" : "Not Completed"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tasks;
