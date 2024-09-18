import React, { useState } from "react";
import { useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useToast } from "@/hooks/use-toast";
import Task from "./Task";

interface TodosProps {
  items: Array<Doc<"todos">>;
  isoverdue?: boolean;
}

const Todos = ({ items, isoverdue }: TodosProps) => {
  const { toast } = useToast();
  const checkATodo = useMutation(api.queries.todos.checkATodo);
  const unCheckATodo = useMutation(api.queries.todos.unCheckATodo);

  const [loadingTasks, setLoadingTasks] = useState<Record<string, boolean>>({});

  const handleOnChangeTodo = async (task: Doc<"todos">) => {
    setLoadingTasks((prev) => ({ ...prev, [task._id]: true }));
    try {
      if (task.isCompleted) {
        await unCheckATodo({ taskId: task._id });
      } else {
        await checkATodo({ taskId: task._id });
        toast({
          title: "✅ Task completed",
          description: "You're a rockstar",
          duration: 3000,
        });
      }
    } finally {
      setLoadingTasks((prev) => ({ ...prev, [task._id]: false }));
    }
  };

  return items.map((task) => (
    <Task
      key={task._id}
      data={task}
      isCompleted={task.isCompleted}
      isoverdue={isoverdue}
      handleOnChange={() => handleOnChangeTodo(task)}
      isLoading={loadingTasks[task._id]}
    />
  ));
};

export default Todos;
