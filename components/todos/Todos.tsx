import React from "react";
import { useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useToast } from "@/hooks/use-toast";
import Task from "./Task";

const Todos = ({ items }: { items: Array<Doc<"todos">> }) => {
  const { toast } = useToast();
  const checkATodo = useMutation(api.queries.todos.checkATodo);
  const unCheckATodo = useMutation(api.queries.todos.unCheckATodo);

  const handleOnChangeTodo = (task: Doc<"todos">) => {
    if (task.isCompleted) {
      unCheckATodo({ taskId: task._id });
    } else {
      checkATodo({ taskId: task._id });
      toast({
        title: "✅ Task completed",
        description: "You're a rockstar",
        duration: 3000,
      });
    }
  };

  return items.map((task, idx) => (
    <Task
      key={idx}
      data={task}
      isCompleted={task.isCompleted}
      handleOnChange={() => handleOnChangeTodo(task)}
    />
  ));
};

export default Todos;
