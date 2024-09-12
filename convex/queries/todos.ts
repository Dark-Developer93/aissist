import { v } from "convex/values";

import { mutation, query, action } from "../_generated/server";
import { api } from "../_generated/api";
import { handleUserId } from "../auth";
import { getStartOfDay, getEndOfDay } from "@/utils/date";
import { getEmbeddingsWithAI } from "./ai";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return (await ctx.db.query("todos").collect()) || [];
  },
});

export const getCompletedTodosByProjectId = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    const userId = await handleUserId(ctx);
    if (userId) {
      return await ctx.db
        .query("todos")
        .filter((q) => q.eq(q.field("userId"), userId))
        .filter((q) => q.eq(q.field("projectId"), projectId))
        .filter((q) => q.eq(q.field("isCompleted"), true))
        .collect();
    }
    return [];
  },
});

export const getTodosByProjectId = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    const userId = await handleUserId(ctx);
    if (userId) {
      return await ctx.db
        .query("todos")
        .filter((q) => q.eq(q.field("userId"), userId))
        .filter((q) => q.eq(q.field("projectId"), projectId))
        .collect();
    }
    return [];
  },
});

export const getInCompleteTodosByProjectId = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    const userId = await handleUserId(ctx);
    if (userId) {
      return await ctx.db
        .query("todos")
        .filter((q) => q.eq(q.field("userId"), userId))
        .filter((q) => q.eq(q.field("projectId"), projectId))
        .filter((q) => q.eq(q.field("isCompleted"), false))
        .collect();
    }
    return [];
  },
});

export const getTodosTotalByProjectId = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    const userId = await handleUserId(ctx);
    if (userId) {
      const todos = await ctx.db
        .query("todos")
        .filter((q) => q.eq(q.field("userId"), userId))
        .filter((q) => q.eq(q.field("projectId"), projectId))
        .filter((q) => q.eq(q.field("isCompleted"), true))
        .collect();

      return todos?.length || 0;
    }
    return 0;
  },
});

export const todayTodos = query({
  args: {},
  handler: async (ctx) => {
    const userId = await handleUserId(ctx);

    if (userId) {
      const todayStart = getStartOfDay();
      const todayEnd = getEndOfDay();

      return await ctx.db
        .query("todos")
        .filter((q) => q.eq(q.field("userId"), userId))
        .filter(
          (q) =>
            q.gte(q.field("dueDate"), todayStart.valueOf()) &&
            q.lte(todayEnd.valueOf(), q.field("dueDate"))
        )
        .collect();
    }
    return [];
  },
});

export const overdueTodos = query({
  args: {},
  handler: async (ctx) => {
    const userId = await handleUserId(ctx);

    if (userId) {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      return await ctx.db
        .query("todos")
        .filter((q) => q.eq(q.field("userId"), userId))
        .filter((q) => q.lt(q.field("dueDate"), todayStart.getTime()))
        .collect();
    }
    return [];
  },
});

export const completedTodos = query({
  args: {},
  handler: async (ctx) => {
    return (
      (await ctx.db
        .query("todos")
        .filter((q) => q.eq(q.field("isCompleted"), true))
        .collect()) || []
    );
  },
});

export const inCompleteTodos = query({
  args: {},
  handler: async (ctx) => {
    return (
      (await ctx.db
        .query("todos")
        .filter((q) => q.eq(q.field("isCompleted"), false))
        .collect()) || []
    );
  },
});

export const totalTodos = query({
  args: {},
  handler: async (ctx) => {
    const todos = await ctx.db
      .query("todos")
      .filter((q) => q.eq(q.field("isCompleted"), true))
      .collect();

    return todos.length || 0;
  },
});

export const checkATodo = mutation({
  args: { taskId: v.id("todos") },
  handler: async (ctx, { taskId }) => {
    const newTaskId = await ctx.db.patch(taskId, { isCompleted: true });
    return newTaskId;
  },
});

export const unCheckATodo = mutation({
  args: { taskId: v.id("todos") },
  handler: async (ctx, { taskId }) => {
    const newTaskId = await ctx.db.patch(taskId, { isCompleted: false });
    return newTaskId;
  },
});

export const createATodo = mutation({
  args: {
    taskName: v.string(),
    description: v.optional(v.string()),
    priority: v.number(),
    dueDate: v.number(),
    projectId: v.id("projects"),
    labelId: v.id("labels"),
    embedding: v.optional(v.array(v.float64())),
  },
  handler: async (
    ctx,
    { taskName, description, priority, dueDate, projectId, labelId, embedding }
  ) => {
    try {
      const userId = await handleUserId(ctx);
      if (userId) {
        const newTaskId = await ctx.db.insert("todos", {
          userId,
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
      console.log("Error occurred during createATodo mutation", err);

      return null;
    }
  },
});

export const updateTodo = mutation({
  args: {
    taskId: v.id("todos"),
    taskName: v.string(),
    description: v.optional(v.string()),
    priority: v.number(),
    dueDate: v.number(),
    projectId: v.id("projects"),
    labelId: v.id("labels"),
  },
  handler: async (
    ctx,
    { taskId, taskName, description, priority, dueDate, projectId, labelId }
  ) => {
    try {
      const userId = await handleUserId(ctx);
      if (userId) {
        const newTaskId = await ctx.db.patch(taskId, {
          taskName,
          description,
          priority,
          dueDate,
          projectId,
          labelId,
        });
        return newTaskId;
      }

      return null;
    } catch (err) {
      console.log("Error occurred during updateTodo mutation", err);

      return null;
    }
  },
});

export const createTodoAndEmbeddings = action({
  args: {
    taskName: v.string(),
    description: v.optional(v.string()),
    priority: v.number(),
    dueDate: v.number(),
    projectId: v.id("projects"),
    labelId: v.id("labels"),
  },
  handler: async (
    ctx,
    { taskName, description, priority, dueDate, projectId, labelId }
  ) => {
    const embedding = await getEmbeddingsWithAI(taskName);
    await ctx.runMutation(api.queries.todos.createATodo, {
      taskName,
      description,
      priority,
      dueDate,
      projectId,
      labelId,
      embedding,
    });
  },
});

export const groupTodosByDate = query({
  args: {},
  handler: async (ctx) => {
    const userId = await handleUserId(ctx);

    if (userId) {
      const todos = await ctx.db
        .query("todos")
        .filter((q) => q.eq(q.field("userId"), userId))
        .filter((q) => q.gt(q.field("dueDate"), new Date().getTime()))
        .collect();

      const groupedTodos = todos.reduce<any>((acc, todo) => {
        const dueDate = new Date(todo.dueDate).toDateString();
        acc[dueDate] = (acc[dueDate] || []).concat(todo);
        return acc;
      }, {});

      return groupedTodos;
    }
    return [];
  },
});

export const deleteATodo = mutation({
  args: {
    taskId: v.id("todos"),
  },
  handler: async (ctx, { taskId }) => {
    try {
      const userId = await handleUserId(ctx);
      if (userId) {
        const deletedTaskId = await ctx.db.delete(taskId);
        //query todos and map through them and delete

        return deletedTaskId;
      }

      return null;
    } catch (err) {
      console.log("Error occurred during deleteATodo mutation", err);

      return null;
    }
  },
});
