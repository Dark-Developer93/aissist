"use client";

import { Dispatch, SetStateAction } from "react";
import { CalendarIcon, Inbox, List, Tag, Text } from "lucide-react";
import { useAction, useQuery } from "convex/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { CardFooter } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/date";
import {
  GET_STARTED_PROJECT_ID,
  GET_STARTED_LABEL_ID,
  priorityMap,
} from "@/utils";

const FormSchema = z.object({
  taskName: z.string().min(2, {
    message: "Task name must be at least 2 characters.",
  }),
  description: z.string().optional().default(""),
  dueDate: z.date({ required_error: "A due date is required" }),
  priority: z.string().min(1, { message: "Please select a priority" }),
  projectId: z.string().min(1, { message: "Please select a Project" }),
  labelId: z.string().min(1, { message: "Please select a Label" }),
});

export default function AddTaskInline({
  setShowAddTask,
  parentTask,
  projectId: myProjectId,
}: {
  setShowAddTask: Dispatch<SetStateAction<boolean>>;
  parentTask?: Doc<"todos">;
  projectId?: Id<"projects">;
}) {
  const { toast } = useToast();
  const projects = useQuery(api.queries.projects.getProjects) ?? [];
  const labels = useQuery(api.queries.labels.getLabels) ?? [];

  const labelId = parentTask?.labelId || (GET_STARTED_LABEL_ID as Id<"labels">);
  const priority = parentTask?.priority?.toString() || "medium";
  const parentId = parentTask?._id;
  const projectId =
    myProjectId ||
    parentTask?.projectId ||
    (GET_STARTED_PROJECT_ID as Id<"projects">);

  const createASubTodoEmbeddings = useAction(
    api.queries.subTodos.createSubTodoAndEmbeddings
  );

  const createTodoEmbeddings = useAction(
    api.queries.todos.createTodoAndEmbeddings
  );

  const defaultValues = {
    taskName: "",
    description: "",
    priority,
    dueDate: new Date(),
    projectId,
    labelId,
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { taskName, description, priority, dueDate, projectId, labelId } =
      data;

    if (projectId) {
      if (parentId) {
        //subtodo
        const mutationId = createASubTodoEmbeddings({
          parentId,
          taskName,
          description,
          priority: priorityMap[priority as keyof typeof priorityMap],
          dueDate: new Date(formatDate(dueDate)).valueOf(),
          projectId: projectId as Id<"projects">,
          labelId: labelId as Id<"labels">,
        });

        if (mutationId !== undefined) {
          toast({
            title: "🔥 Created a task!",
            duration: 3000,
          });
          form.reset({ ...defaultValues });
        }
      } else {
        const mutationId = createTodoEmbeddings({
          taskName,
          description,
          priority: priorityMap[priority as keyof typeof priorityMap],
          dueDate: new Date(formatDate(dueDate)).valueOf(),
          projectId: projectId as Id<"projects">,
          labelId: labelId as Id<"labels">,
        });

        if (mutationId !== undefined) {
          toast({
            title: "🦄 Created a task!",
            duration: 3000,
          });
          form.reset({ ...defaultValues });
        }
      }
    }
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 border-2 p-2 border-gray-200 my-2 rounded-xl px-3 pt-4 border-foreground/20"
        >
          <FormField
            control={form.control}
            name="taskName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="taskName"
                    type="text"
                    placeholder="Enter your Task name"
                    className="border-0 font-semibold text-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-start gap-2">
                    <Text className="h-4 w-4 text-primary" />
                    <Textarea
                      id="description"
                      placeholder="Description"
                      className="resize-none"
                      {...field}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "flex gap-2 pl-3 font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="h-4 w-4 text-primary" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={priority}
                  >
                    <FormControl>
                      <SelectTrigger className="gap-2">
                        <List className="h-4 w-4 text-primary" />
                        <SelectValue placeholder="Select a Priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(priorityMap).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="labelId"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={labelId || field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="gap-2">
                        <Tag className="h-4 w-4 text-primary" />
                        <SelectValue placeholder="Select a Label" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {labels.map((label: Doc<"labels">, idx: number) => (
                        <SelectItem key={idx} value={label._id}>
                          {label?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <CardFooter className="flex-col lg:flex-row lg:justify-between gap-2 border-t-2 p-0 pt-3">
            <div className="w-full lg:w-1/3">
              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={projectId || field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <Inbox className="h-4 w-4 text-primary" />
                          <SelectValue placeholder="Select a Project" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {projects.map(
                          (project: Doc<"projects">, idx: number) => (
                            <SelectItem key={idx} value={project._id}>
                              {project?.name}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-3 self-end">
              <Button
                className="bg-gray-300/40 text-gray-950 px-6 hover:bg-gray-300"
                variant={"outline"}
                onClick={() => setShowAddTask(false)}
              >
                Cancel
              </Button>
              <Button className="px-6" type="submit">
                Add task
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </div>
  );
}
