import { v } from "convex/values";

import { mutation, query } from "../_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return (await ctx.db.query("todos").collect()) || [];
  },
});

export const completedSubTodos = query({
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

export const incompleteSubTodos = query({
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

export const totalSubTodos = query({
  args: {},
  handler: async (ctx) => {
    const todos = await ctx.db
      .query("todos")
      .filter((q) => q.eq(q.field("isCompleted"), true))
      .collect();

    return todos.length || 0;
  },
});

export const checkASubTodo = mutation({
  args: { taskId: v.id("todos") },
  handler: async (ctx, { taskId }) => {
    const newTaskId = await ctx.db.patch(taskId, { isCompleted: true });
    return newTaskId;
  },
});

export const uncheckASubTodo = mutation({
  args: { taskId: v.id("todos") },
  handler: async (ctx, { taskId }) => {
    const newTaskId = await ctx.db.patch(taskId, { isCompleted: false });
    return newTaskId;
  },
});
