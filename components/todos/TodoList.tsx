"use client";

import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import CompletedTodos from "./CompletedTodos";
import Todos from "./Todos";
import Loading from "../loading/Loading";
import AddTaskWrapper from "../add-tasks/AddTaskWrapper";

const TodoList = () => {
  const todos = useQuery(api.queries.todos.get);
  const completedTodos = useQuery(api.queries.todos.completedTodos);
  const inCompleteTodos = useQuery(api.queries.todos.inCompleteTodos);
  const totalTodos = useQuery(api.queries.todos.totalTodos);

  // In COnvex if the query is loading returns `undefined`. https://github.com/get-convex/convex-js/blob/7003484b984c9ef35427637926ebd0ba1097a346/src/react/client.ts#L571
  if (
    todos === undefined ||
    completedTodos === undefined ||
    inCompleteTodos === undefined ||
    totalTodos === undefined
  ) {
    return <Loading />;
  }

  return (
    <div className="xl:px-40">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Inbox</h1>
      </div>
      <div className="flex flex-col gap-1 py-4">
        <Todos items={inCompleteTodos} />
      </div>
      <AddTaskWrapper />
      <div className="flex flex-col gap-1 py-4">
        <Todos items={completedTodos} />
      </div>
      <CompletedTodos totalTodos={totalTodos} />
    </div>
  );
};
export default TodoList;
