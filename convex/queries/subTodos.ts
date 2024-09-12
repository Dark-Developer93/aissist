import { v } from "convex/values";

import { mutation, query, action } from "../_generated/server";
import { api } from "../_generated/api";
import { handleUserId } from "../auth";
import { getEmbeddingsWithAI } from "./ai";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await handleUserId(ctx);
    if (userId) {
      return await ctx.db
        .query("subTodos")
        .filter((q) => q.eq(q.field("userId"), userId))
        .collect();
    }
    return [];
  },
});

export const getSubTodosByParentId = query({
  args: {
    parentId: v.id("todos"),
  },
  handler: async (ctx, { parentId }) => {
    const userId = await handleUserId(ctx);
    if (userId) {
      return await ctx.db
        .query("subTodos")
        .filter((q) => q.eq(q.field("userId"), userId))
        .filter((q) => q.eq(q.field("parentId"), parentId))
        .collect();
    }
    return [];
  },
});

export const checkASubTodo = mutation({
  args: { taskId: v.id("subTodos") },
  handler: async (ctx, { taskId }) => {
    const newTaskId = await ctx.db.patch(taskId, { isCompleted: true });
    return newTaskId;
  },
});

export const unCheckASubTodo = mutation({
  args: { taskId: v.id("subTodos") },
  handler: async (ctx, { taskId }) => {
    const newTaskId = await ctx.db.patch(taskId, { isCompleted: false });
    return newTaskId;
  },
});

export const createASubTodo = mutation({
  args: {
    taskName: v.string(),
    description: v.optional(v.string()),
    priority: v.number(),
    dueDate: v.number(),
    projectId: v.id("projects"),
    labelId: v.id("labels"),
    parentId: v.id("todos"),
    embedding: v.optional(v.array(v.float64())),
  },
  handler: async (
    ctx,
    {
      taskName,
      description,
      priority,
      dueDate,
      projectId,
      labelId,
      parentId,
      embedding,
    }
  ) => {
    try {
      const userId = await handleUserId(ctx);
      if (userId) {
        const newTaskId = await ctx.db.insert("subTodos", {
          userId,
          parentId,
          taskName,
          description,
          priority,
          dueDate,
          projectId,
          labelId,
          isCompleted: false,
          embedding,
        });
        return newTaskId;
      }
      return null;
    } catch (err) {
      console.log("Error occurred during createASubTodo mutation", err);

      return null;
    }
  },
});

export const updateSubTodo = mutation({
  args: {
    taskId: v.id("subTodos"),
    parentId: v.id("todos"),
    taskName: v.string(),
    description: v.optional(v.string()),
    priority: v.number(),
    dueDate: v.number(),
    projectId: v.id("projects"),
    labelId: v.id("labels"),
  },
  handler: async (
    ctx,
    {
      taskId,
      taskName,
      description,
      priority,
      dueDate,
      projectId,
      labelId,
      parentId,
    }
  ) => {
    try {
      const userId = await handleUserId(ctx);
      if (userId) {
        const newSubTaskId = await ctx.db.patch(taskId, {
          taskName,
          description,
          priority,
          dueDate,
          projectId,
          parentId,
          labelId,
        });
        return newSubTaskId;
      }

      return null;
    } catch (err) {
      console.log("Error occurred during updateSubTodo mutation", err);

      return null;
    }
  },
});

export const createSubTodoAndEmbeddings = action({
  args: {
    taskName: v.string(),
    description: v.optional(v.string()),
    priority: v.number(),
    dueDate: v.number(),
    projectId: v.id("projects"),
    labelId: v.id("labels"),
    parentId: v.id("todos"),
  },
  handler: async (
    ctx,
    { taskName, description, priority, dueDate, projectId, labelId, parentId }
  ) => {
    const embedding = await getEmbeddingsWithAI(taskName);
    await ctx.runMutation(api.queries.subTodos.createASubTodo, {
      taskName,
      description,
      priority,
      dueDate,
      projectId,
      labelId,
      parentId,
      embedding,
    });
  },
});

export const completedSubTodos = query({
  args: {
    parentId: v.id("todos"),
  },
  handler: async (ctx, { parentId }) => {
    const userId = await handleUserId(ctx);
    if (userId) {
      const todos = await ctx.db
        .query("subTodos")
        .filter((q) => q.eq(q.field("userId"), userId))
        .filter((q) => q.eq(q.field("parentId"), parentId))
        .filter((q) => q.eq(q.field("isCompleted"), true))
        .collect();

      return todos;
    }
    return [];
  },
});

export const inCompleteSubTodos = query({
  args: {
    parentId: v.id("todos"),
  },
  handler: async (ctx, { parentId }) => {
    const userId = await handleUserId(ctx);
    // if (userId) {
    const todos = await ctx.db
      .query("subTodos")
      .filter((q) => q.eq(q.field("userId"), userId))
      .filter((q) => q.eq(q.field("parentId"), parentId))
      .filter((q) => q.eq(q.field("isCompleted"), false))
      .collect();
    return todos;
    // }
    // return [];
  },
});

export const deleteASubTodo = mutation({
  args: {
    taskId: v.id("subTodos"),
  },
  handler: async (ctx, { taskId }) => {
    try {
      const userId = await handleUserId(ctx);
      if (userId) {
        const deletedSubTaskId = await ctx.db.delete(taskId);
        //query sub todos and map through them and delete

        return deletedSubTaskId;
      }

      return null;
    } catch (err) {
      console.log("Error occurred during deleteASubTodo mutation", err);

      return null;
    }
  },
});
