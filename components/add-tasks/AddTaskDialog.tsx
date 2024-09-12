"use client";

import { useEffect, useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronDown,
  Flag,
  Hash,
  Tag,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";

import { Doc, Id } from "@/convex/_generated/dataModel";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useToast } from "@/hooks/use-toast";
import Task from "@/components/todos/Task";
import AddTaskWrapper from "./AddTaskWrapper";
import { getPriorityLabel, priorityMap } from "@/utils";
// import SuggestMissingTasks from "./suggest-tasks";

const AddTaskDialog = ({ data }: { data: Doc<"todos"> }) => {
  const { projectId, labelId, priority, dueDate, _id } = data;

  const { toast } = useToast();
  const project = useQuery(api.queries.projects.getProjectByProjectId, {
    projectId,
  });
  const label = useQuery(api.queries.labels.getLabelByLabelId, { labelId });
  const projects = useQuery(api.queries.projects.getProjects) || [];
  const labels = useQuery(api.queries.labels.getLabels) || [];

  const inCompletedSubtodosByProject =
    useQuery(api.queries.subTodos.inCompleteSubTodos, { parentId: _id }) ?? [];

  const completedSubtodosByProject =
    useQuery(api.queries.subTodos.completedSubTodos, { parentId: _id }) ?? [];

  const checkASubTodoMutation = useMutation(api.queries.subTodos.checkASubTodo);
  const unCheckASubTodoMutation = useMutation(
    api.queries.subTodos.unCheckASubTodo
  );

  const deleteATodoMutation = useMutation(api.queries.todos.deleteATodo);
  const updateTodoMutation = useMutation(api.queries.todos.updateTodo);

  const [todoDetails, setTodoDetails] = useState<
    Array<{ labelName: string; value: string; icon: React.ReactNode }>
  >([]);
  const [isEditing, setIsEditing] = useState({
    taskName: false,
    description: false,
    priority: false,
    dueDate: false,
    project: false,
    label: false,
  });
  const [editedData, setEditedData] = useState(data);
  const toggleEdit = (field: keyof typeof isEditing) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  useEffect(() => {
    const data = [
      {
        labelName: "Project",
        value: project?.name || "",
        icon: <Hash className="w-4 h-4 text-primary capitalize" />,
      },
      {
        labelName: "Due date",
        value: format(dueDate || new Date(), "MMM dd yyyy"),
        icon: <CalendarIcon className="w-4 h-4 text-primary capitalize" />,
      },
      {
        labelName: "Priority",
        value: priority?.toString() || "",
        icon: <Flag className="w-4 h-4 text-primary capitalize" />,
      },
      {
        labelName: "Label",
        value: label?.name || "",
        icon: <Tag className="w-4 h-4 text-primary capitalize" />,
      },
    ];
    if (data) {
      setTodoDetails(data);
    }
  }, [dueDate, label?.name, priority, project]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".edit-area")) {
        setIsEditing({
          taskName: false,
          description: false,
          priority: false,
          dueDate: false,
          project: false,
          label: false,
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSave = () => {
    updateTodoMutation({
      taskId: _id,
      taskName: editedData.taskName,
      description: editedData.description,
      priority: editedData.priority,
      dueDate: editedData.dueDate,
      projectId: editedData.projectId,
      labelId: editedData.labelId,
    });
    setIsEditing({
      taskName: false,
      description: false,
      priority: false,
      dueDate: false,
      project: false,
      label: false,
    });
    toast({
      title: "✅ Task updated successfully",
      duration: 3000,
    });
  };
  const handleDeleteTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const deletedId = deleteATodoMutation({ taskId: _id });
    if (deletedId !== undefined) {
      toast({
        title: "🗑️ Successfully deleted",
        duration: 3000,
      });
    }
  };

  console.log("editedData", editedData);

  return (
    <DialogContent className="max-w-4xl lg:h-4/6 flex flex-col md:flex-row lg:justify-between text-right">
      <DialogHeader className="w-full">
        <DialogTitle className="edit-area">
          {isEditing.taskName ? (
            <Input
              value={editedData.taskName}
              onChange={(e) =>
                setEditedData({ ...editedData, taskName: e.target.value })
              }
              onBlur={() => toggleEdit("taskName")}
            />
          ) : (
            <div
              className="capitalize hover:text-primary hover:cursor-pointer"
              onClick={() => toggleEdit("taskName")}
            >
              {editedData.taskName}
            </div>
          )}
        </DialogTitle>
        <DialogDescription className="edit-area">
          {isEditing.description ? (
            <Input
              value={editedData.description || ""}
              onChange={(e) =>
                setEditedData({ ...editedData, description: e.target.value })
              }
              onBlur={() => toggleEdit("description")}
            />
          ) : (
            <p
              className="my-2 capitalize hover:text-primary hover:cursor-pointer"
              onClick={() => toggleEdit("description")}
            >
              {editedData.description}
            </p>
          )}
          <div className="flex items-center gap-1 mt-12 border-b-2 border-gray-100 pb-2 flex-wrap sm:justify-between lg:gap-0 ">
            <div className="flex gap-1">
              <ChevronDown className="w-5 h-5 text-primary" />
              <p className="font-bold flex text-sm text-gray-900">Sub-tasks</p>
            </div>
            <div>
              {/* <SuggestMissingTasks
                projectId={projectId}
                taskName={taskName}
                description={description}
                parentId={_id}
                isSubTask={true}
              /> */}
            </div>
          </div>
          <div className="pl-4">
            {inCompletedSubtodosByProject.map((task) => (
              <Task
                key={task._id}
                data={task}
                isCompleted={task.isCompleted}
                handleOnChange={() =>
                  checkASubTodoMutation({ taskId: task._id })
                }
              />
            ))}
            <div className="pb-4">
              <AddTaskWrapper parentTask={data} />
            </div>
            {completedSubtodosByProject.map((task) => (
              <Task
                key={task._id}
                data={task}
                isCompleted={task.isCompleted}
                handleOnChange={() =>
                  unCheckASubTodoMutation({ taskId: task._id })
                }
              />
            ))}
          </div>
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-2 bg-gray-100 lg:w-2/3">
        <div className="grid gap-2 p-4 border-b-2 w-full edit-area">
          <Label className="flex items-start">Project</Label>
          {isEditing.project ? (
            <Select
              value={editedData.projectId}
              onValueChange={(value) =>
                setEditedData({
                  ...editedData,
                  projectId: value as Id<"projects">,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project._id} value={project._id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div
              className="flex text-left items-center justify-start gap-2 pb-2 hover:text-primary hover:cursor-pointer"
              onClick={() => toggleEdit("project")}
            >
              <Hash className="w-4 h-4 text-primary capitalize" />
              <p className="text-sm">{project?.name}</p>
            </div>
          )}
        </div>
        <div className="grid gap-2 p-4 border-b-2 w-full edit-area">
          <Label className="flex items-start">Due date</Label>
          {isEditing.dueDate ? (
            <Calendar
              mode="single"
              selected={new Date(editedData.dueDate)}
              onSelect={(date) =>
                setEditedData({
                  ...editedData,
                  dueDate: date?.getTime() || Date.now(),
                })
              }
              className="rounded-md border"
            />
          ) : (
            <div
              className="flex text-left items-center justify-start gap-2 pb-2 hover:text-primary hover:cursor-pointer"
              onClick={() => toggleEdit("dueDate")}
            >
              <CalendarIcon className="w-4 h-4 text-primary capitalize" />
              <p className="text-sm">
                {format(editedData.dueDate, "MMM dd yyyy")}
              </p>
            </div>
          )}
        </div>
        <div className="grid gap-2 p-4 border-b-2 w-full edit-area">
          <Label className="flex items-start">Priority</Label>
          {isEditing.priority ? (
            <Select
              value={editedData.priority?.toString()}
              onValueChange={(value) =>
                setEditedData({ ...editedData, priority: parseInt(value) })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(priorityMap).map(([key, value]) => (
                  <SelectItem key={key} value={value.toString()}>
                    {getPriorityLabel(value)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div
              className="flex text-left items-center justify-start gap-2 pb-2 hover:text-primary hover:cursor-pointer"
              onClick={() => toggleEdit("priority")}
            >
              <Flag className="w-4 h-4 text-primary capitalize" />
              <p className="text-sm">{getPriorityLabel(data.priority)}</p>
            </div>
          )}
        </div>
        <div className="grid gap-2 p-4 border-b-2 w-full edit-area">
          <Label className="flex items-start">Label</Label>
          {isEditing.label ? (
            <Select
              value={editedData.labelId}
              onValueChange={(value) =>
                setEditedData({ ...editedData, labelId: value as Id<"labels"> })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {labels.map((label) => (
                  <SelectItem key={label._id} value={label._id}>
                    {label.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div
              className="flex text-left items-center justify-start gap-2 pb-2 hover:text-primary hover:cursor-pointer"
              onClick={() => toggleEdit("label")}
            >
              <Tag className="w-4 h-4 text-primary capitalize" />
              <p className="text-sm">{label?.name}</p>
            </div>
          )}
        </div>
        <div className="flex gap-2 p-4 w-full justify-end">
          <Button
            variant="ghost"
            onClick={handleSave}
            className="hover:text-primary"
          >
            Save Changes
          </Button>
          <form onSubmit={handleDeleteTodo}>
            <Button type="submit" variant="ghost" className="group">
              <Trash2 className="w-4 h-4 group-hover:text-red-600 transition-colors" />
            </Button>
          </form>
        </div>
      </div>
    </DialogContent>
  );
};
export default AddTaskDialog;
