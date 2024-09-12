// import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { v } from "convex/values";

import { api } from "@/convex/_generated/api";
import { action } from "@/convex/_generated/server";

import { Id } from "@/convex/_generated/dataModel";

// const apiKey = process.env.OPEN_AI_KEY;
// const openai = new OpenAI({ apiKey });
const apiKey = process.env.GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);

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

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `I'm a project manager and I need help identifying missing to-do items. I have a list of existing tasks in JSON format, containing objects with 'taskName' and 'description' properties. I also have a good understanding of the project scope. Can you help me identify 5 additional to-do items for the project with projectName that are not yet included in this list? Please provide these missing items in a separate JSON array with the key 'todos' containing objects with 'taskName' and 'description' properties. Ensure there are no duplicates between the existing list and the new suggestions.`;

    const result = await model.generateContent([
      prompt,
      JSON.stringify({ todos, projectName }),
    ]);
    const response = await result.response;
    const messageContent = response.text();

    console.log({ messageContent });

    if (messageContent) {
      const items = JSON.parse(messageContent)?.todos ?? [];
      const AI_LABEL_ID = "k57exc6xrw3ar5e1nmab4vnbjs6v1m4p";

      for (let i = 0; i < items.length; i++) {
        const { taskName, description } = items[i];
        const embedding = await getEmbeddingsWithAI(taskName);
        await ctx.runMutation(api.queries.todos.createATodo, {
          taskName,
          description,
          priority: 1,
          dueDate: new Date().getTime(),
          projectId,
          labelId: AI_LABEL_ID as Id<"labels">,
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

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `I'm a project manager and I need help identifying missing sub tasks for a parent todo. I have a list of existing sub tasks in JSON format, containing objects with 'taskName' and 'description' properties. I also have a good understanding of the project scope. Can you help me identify 2 additional sub tasks that are not yet included in this list? Please provide these missing items in a separate JSON array with the key 'todos' containing objects with 'taskName' and 'description' properties. Ensure there are no duplicates between the existing list and the new suggestions.`;

    const result = await model.generateContent([
      prompt,
      JSON.stringify({
        todos,
        projectName,
        parentTodo: { taskName, description },
      }),
    ]);
    const response = await result.response;
    const messageContent = response.text();

    console.log({ messageContent });

    if (messageContent) {
      const parseAIResponse = (content: string) => {
        const jsonContent = content.replace(/```json\n|\n```/g, "").trim();
        try {
          return JSON.parse(jsonContent)?.todos ?? [];
        } catch (error) {
          console.error("Failed to parse AI response:", error);
          return [];
        }
      };

      const items = parseAIResponse(messageContent);
      const AI_LABEL_ID = "jx721pm26fd43f6h237f88v3j170eyb1";

      for (let i = 0; i < items.length; i++) {
        const { taskName, description } = items[i];
        const embedding = await getEmbeddingsWithAI(taskName);
        await ctx.runMutation(api.queries.subTodos.createASubTodo, {
          taskName,
          description,
          priority: 1,
          dueDate: new Date().getTime(),
          projectId,
          parentId,
          labelId: AI_LABEL_ID as Id<"labels">,
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
  const embedding = result.embedding;

  console.log(
    `Embedding of ${searchText}: , ${embedding.values.length} dimensions`
  );

  return embedding.values;
};
