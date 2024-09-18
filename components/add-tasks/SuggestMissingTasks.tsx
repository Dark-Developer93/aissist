import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAction } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";

export default function SuggestMissingTasks({
  projectId,
  isSubTask = false,
  taskName = "",
  description = "",
  parentId,
}: {
  projectId: Id<"projects">;
  isSubTask?: boolean;
  taskName?: string;
  description?: string;
  parentId?: Id<"todos">;
}) {
  const [isLoadingSuggestMissingTasks, setIsLoadingSuggestMissingTasks] =
    useState(false);
  const { toast } = useToast();

  const suggestMissingTasks =
    useAction(api.queries.ai.suggestMissingItemsWithAi) || [];

  const suggestMissingSubTasks =
    useAction(api.queries.ai.suggestMissingSubItemsWithAi) || [];

  const retryWithDelay = async (
    fn: () => Promise<any>,
    retries = 3,
    delay = 1000,
  ) => {
    try {
      return await fn();
    } catch (error) {
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        return retryWithDelay(fn, retries - 1, delay * 2);
      }
      throw error;
    }
  };

  const handleMissingTasks = async () => {
    setIsLoadingSuggestMissingTasks(true);
    try {
      await retryWithDelay(() => suggestMissingTasks({ projectId }));
      toast({
        title: "Successfully suggested missing tasks",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error in suggestMissingTasks", error);
      toast({
        title: "Failed to suggest missing tasks. Please try again later.",
        duration: 3000,
      });
    } finally {
      setIsLoadingSuggestMissingTasks(false);
    }
  };

  const handleMissingSubTasks = async () => {
    setIsLoadingSuggestMissingTasks(true);
    try {
      if (parentId) {
        await retryWithDelay(() =>
          suggestMissingSubTasks({
            projectId,
            taskName,
            description,
            parentId,
          }),
        );
        toast({
          title: "Successfully suggested missing subtasks",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error in suggestMissingSubTasks", error);
      toast({
        title: "Failed to suggest missing subtasks. Please try again later.",
        duration: 3000,
      });
    } finally {
      setIsLoadingSuggestMissingTasks(false);
    }
  };

  return (
    <Button
      variant="outline"
      disabled={isLoadingSuggestMissingTasks}
      onClick={isSubTask ? handleMissingSubTasks : handleMissingTasks}
    >
      {isLoadingSuggestMissingTasks ? (
        <div className="flex gap-2">
          Loading Tasks (AI)
          <Loader2 className="h-5 w-5 text-primary animate-spin" />
        </div>
      ) : (
        "Suggest Missing Tasks (AI) 💖"
      )}
    </Button>
  );
}
