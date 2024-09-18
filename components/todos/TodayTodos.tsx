"use client";

import { Dot } from "lucide-react";
import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import AddTaskWrapper from "@/components/add-tasks/AddTaskWrapper";
import Todos from "@/components/todos/Todos";
import { formatDate } from "@/utils";
import Loading from "@/components/loading/Loading";

const TodayTodos = () => {
  const todos = useQuery(api.queries.todos.get);
  const todayTodos = useQuery(api.queries.todos.todayTodos);
  const overdueTodos = useQuery(api.queries.todos.overdueTodos);

  if (
    todos === undefined ||
    todayTodos === undefined ||
    overdueTodos === undefined
  ) {
    return <Loading />;
  }
  return (
    <div className="xl:px-40">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Today</h1>
      </div>
      <div className="flex flex-col gap-1 py-4">
        <p className="font-bold flex text-sm">Overdue</p>
        <Todos items={overdueTodos} />
      </div>
      <AddTaskWrapper />
      <div className="flex flex-col gap-1 py-4">
        <p className="font-bold flex text-sm items-center border-b-2 p-2 border-gray-100">
          {formatDate(new Date())}
          <Dot />
          Today
          <Dot />
          {formatDate(new Date(), "weekday")}
        </p>
        <Todos items={todayTodos} />
      </div>
    </div>
  );
};
export default TodayTodos;
