"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Todos from "@/components/todos/Todos";
import Loading from "@/components/loading/Loading";
import AddTaskWrapper from "@/components/add-tasks/AddTaskWrapper";
import CompletedTodos from "@/components/todos/CompletedTodos";
import SuggestMissingTasks from "@/components/add-tasks/SuggestMissingTasks";
import DeleteProject from "@/components/projects/DeleteProject";

export default function ProjectTodos({
  projectId,
}: {
  projectId: Id<"projects">;
}) {
  const inCompleteTodosByProject = useQuery(
    api.queries.todos.getInCompleteTodosByProjectId,
    {
      projectId,
    },
  );

  const completedTodosByProject = useQuery(
    api.queries.todos.getCompletedTodosByProjectId,
    {
      projectId,
    },
  );

  const project = useQuery(api.queries.projects.getProjectByProjectId, {
    projectId,
  });

  if (
    project === undefined ||
    inCompleteTodosByProject === undefined ||
    completedTodosByProject === undefined
  ) {
    return <Loading />;
  }

  return (
    <div className="xl:px-40">
      <div className="flex items-center justify-between flex-wrap gap-2 lg:gap-0">
        <h1 className="text-lg font-semibold md:text-2xl">{project?.name}</h1>
        <div className="flex gap-6 lg:gap-12 items-center">
          <SuggestMissingTasks projectId={projectId} />
          <DeleteProject projectId={projectId} />
        </div>
      </div>
      <div className="flex flex-col gap-1 py-4">
        <Todos items={inCompleteTodosByProject} />
      </div>
      <AddTaskWrapper />
      <div className="flex flex-col gap-1 py-4">
        <Todos items={completedTodosByProject} />
      </div>
      <CompletedTodos totalTodos={completedTodosByProject.length} />
    </div>
  );
}
