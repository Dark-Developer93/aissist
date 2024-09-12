import { Calendar, GitBranch, Loader2 } from "lucide-react";
import clsx from "clsx";

import { Checkbox } from "../ui/checkbox";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Doc } from "@/convex/_generated/dataModel";
import { formatDate, getPriorityLabel } from "@/utils";
import AddTaskDialog from "../add-tasks/AddTaskDialog";
import { Badge } from "../ui/badge";

function isSubTodo(
  data: Doc<"todos"> | Doc<"subTodos">
): data is Doc<"subTodos"> {
  return "parentId" in data;
}

const getPriorityColor = (priority: number) => {
  switch (priority) {
    case 4:
      return "bg-destructive hover:bg-destructive/80";
    case 3:
      return "bg-destructive/80 hover:bg-destructive/60";
    case 2:
      return "bg-primary hover:bg-primary/80";
    case 1:
      return "bg-muted-foreground hover:bg-muted-foreground/80";
    default:
      return "bg-primary hover:bg-primary/80";
  }
};

const Task = ({
  data,
  isCompleted,
  handleOnChange,
  showDetails = false,
  isLoading = false,
}: {
  data: Doc<"todos"> | Doc<"subTodos">;
  isCompleted: boolean;
  handleOnChange?: () => void;
  showDetails?: boolean;
  isLoading?: boolean;
}) => {
  const { taskName, dueDate, priority } = data;

  return (
    <div
      key={data._id}
      className="flex items-center space-x-2 border-b-2 p-2 border-gray-100 animate-in fade-in"
    >
      <Dialog>
        <div className="flex gap-2 items-center justify-end w-full">
          <div className="flex gap-2 w-full">
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
            ) : (
              <Checkbox
                id="todo"
                className={clsx(
                  "w-5 h-5 rounded-xl",
                  isCompleted &&
                    "data-[state=checked]:bg-gray-300 border-gray-300"
                )}
                checked={isCompleted}
                onCheckedChange={handleOnChange}
              />
            )}
            <DialogTrigger asChild>
              <div className="flex flex-col items-start">
                <button
                  className={clsx(
                    "text-sm font-normal text-left hover:text-primary flex items-center gap-4",
                    isCompleted && "line-through text-foreground/30"
                  )}
                >
                  {taskName.charAt(0).toUpperCase() + taskName.slice(1)}
                </button>
                {showDetails && (
                  <div className="flex gap-2">
                    <div className="flex items-center justify-center gap-1">
                      <GitBranch className="w-3 h-3 text-foreground/70" />
                      <p className="text-xs text-foreground/70"></p>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Calendar className="w-3 h-3 text-primary" />
                      <p className="text-xs text-primary">
                        {formatDate(dueDate)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </DialogTrigger>
          </div>
          {!isSubTodo(data) && <AddTaskDialog data={data} />}
        </div>
        <Badge
          className={clsx(
            "text-white hover:text-white",
            getPriorityColor(priority)
          )}
        >
          {getPriorityLabel(priority)}
        </Badge>
      </Dialog>
    </div>
  );
};
export default Task;
