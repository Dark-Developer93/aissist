import { GoogleGenerativeAI } from "@google/generative-ai";
import { v } from "convex/values";

import { api } from "@/convex/_generated/api";
import { action } from "@/convex/_generated/server";
import { Id } from "@/convex/_generated/dataModel";
import { GET_STARTED_LABEL_ID } from "@/utils";

const apiKey = process.env.GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);

const parseAIResponse = (content: string): Array<{ taskName: string; description: string; priority: number }> => {
  const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
  if (jsonMatch && jsonMatch[1]) {
    try {
      return JSON.parse(jsonMatch[1])?.todos ?? [];
    } catch (error) {
      console.error("Failed to parse AI response:", error);
      return [];
    }
  }
  return [];
};

export const suggestMissingItemsWithAi = action({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    const todos = await ctx.runQuery(api.queries.todos.getTodosByProjectId, {
      projectId,
    });
    const project = await ctx.runQuery(
      api.queries.projects.getProjectByProjectId,
      { projectId }
    );
    const projectName = project?.name || "";

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `I'm a project manager and I need help identifying missing to-do items. I have a list of existing tasks in JSON format, containing objects with 'taskName' and 'description' properties. I also have a good understanding of the project scope. Can you help me identify 5 additional to-do items for the project with projectName that are not yet included in this list? Please provide these missing items in a separate JSON array with the key 'todos' containing objects with 'taskName', 'description' and 'priority' (1 is low, and 4 is the highest it's of type number)properties. Ensure there are no duplicates between the existing list and the new suggestions.`;

    const result = await model.generateContent([
      prompt,
      JSON.stringify({ todos, projectName }),
    ]);
    const response = result.response;
    const messageContent = response.text();

    if (messageContent) {
      const items = parseAIResponse(messageContent);

      for (const { taskName, description, priority } of items) {
        const embedding = await getEmbeddingsWithAI(taskName);
        await ctx.runMutation(api.queries.todos.createATodo, {
          taskName,
          description,
          priority,
          dueDate: new Date().getTime(),
          projectId,
          labelId: GET_STARTED_LABEL_ID as Id<"labels">,
          embedding,
        });
      }
    }
  },
});

export const suggestMissingSubItemsWithAi = action({
  args: {
    projectId: v.id("projects"),
    parentId: v.id("todos"),
    taskName: v.string(),
    description: v.string(),
  },
  handler: async (ctx, { projectId, parentId, taskName, description }) => {
    const todos = await ctx.runQuery(
      api.queries.subTodos.getSubTodosByParentId,
      { parentId }
    );
    const project = await ctx.runQuery(
      api.queries.projects.getProjectByProjectId,
      { projectId }
    );
    const projectName = project?.name || "";

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `I'm a project manager and I need help identifying missing sub tasks for a parent todo. I have a list of existing sub tasks in JSON format, containing objects with 'taskName' and 'description' properties. I also have a good understanding of the project scope. Can you help me identify 5 additional sub tasks that are not yet included in this list? Please provide these missing items in a separate JSON array with the key 'todos' containing objects with 'taskName' and 'description' and priority (1 is low, and 4 is the highest it's of type number) for each sub task properties. Ensure there are no duplicates between the existing list and the new suggestions.`;

    const result = await model.generateContent([
      prompt,
      JSON.stringify({
        todos,
        projectName,
        parentTodo: { taskName, description },
      }),
    ]);
    const response = result.response;
    const messageContent = response.text();

    if (messageContent) {
      const items = parseAIResponse(messageContent);

      for (const { taskName, description, priority } of items) {
        const embedding = await getEmbeddingsWithAI(taskName);
        await ctx.runMutation(api.queries.subTodos.createASubTodo, {
          taskName,
          description,
          priority,
          dueDate: new Date().getTime(),
          projectId,
          parentId,
          labelId: GET_STARTED_LABEL_ID as Id<"labels">,
          embedding,
        });
      }
    }
  },
});

export const getEmbeddingsWithAI = async (searchText: string) => {
  if (!apiKey) {
    throw new Error("Gemini API Key is not defined");
  }

  const model = genAI.getGenerativeModel({ model: "embedding-001" });
  const result = await model.embedContent(searchText);
  return result.embedding.values;
};
