"use client";

import { Dot } from "lucide-react";
import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import AddTaskWrapper from "@/components/add-tasks/AddTaskWrapper";
import Todos from "./Todos";
import Loading from "@/components/loading/Loading";
import { formatDate } from "@/utils";

const UpcomingTodos = () => {
  const groupTodosByDate = useQuery(api.queries.todos.groupTodosByDate);
  const overdueTodos = useQuery(api.queries.todos.overdueTodos);

  if (groupTodosByDate === undefined || overdueTodos === undefined) {
    return <Loading />;
  }
  return (
    <div className="xl:px-40">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Upcoming</h1>
      </div>
      <div className="flex flex-col gap-1 py-4">
        <p className="font-bold flex text-sm">Overdue</p>
        <Todos items={overdueTodos} isoverdue={true} />
      </div>
      <div className="pb-6">
        <AddTaskWrapper />
      </div>
      <div className="flex flex-col gap-1 py-4">
        {Object.keys(groupTodosByDate || {}).map((dueDate) => {
          return (
            <div key={dueDate} className="mb-6">
              <p className="font-bold flex text-sm items-center">
                {formatDate(dueDate)} <Dot />
                {formatDate(dueDate, "weekday")}
              </p>
              <ul>
                <Todos items={groupTodosByDate[dueDate]} />
                <AddTaskWrapper />
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingTodos;
