import { partial } from "convex-helpers/validators";
import { adapterMutation, adapterQuery } from "./utils";
import { v } from "convex/values";
import { userSchema } from "@/convex/schema";

export const createUser = adapterMutation({
  args: { user: v.object(userSchema) },
  handler: async (ctx, { user }) => {
    return await ctx.db.insert("users", user as any);
  },
});

export const deleteUser = adapterMutation({
  args: { id: v.id("users") },
  handler: async (ctx, { id }) => {
    const user = await ctx.db.get(id);
    if (user === null) {
      return null;
    }
    await ctx.db.delete(id);
    const sessions = await ctx.db
      .query("sessions")
      .withIndex("userId", (q) => q.eq("userId", id))
      .collect();
    for (const session of sessions) {
      await ctx.db.delete(session._id);
    }
    const accounts = await ctx.db
      .query("accounts")
      .withIndex("userId", (q) => q.eq("userId", id))
      .collect();
    for (const account of accounts) {
      await ctx.db.delete(account._id);
    }
    return user;
  },
});

export const getUser = adapterQuery({
  args: { id: v.id("users") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const getUserByAccount = adapterQuery({
  args: { provider: v.string(), providerAccountId: v.string() },
  handler: async (ctx, { provider, providerAccountId }) => {
    const account = await ctx.db
      .query("accounts")
      .withIndex("providerAndAccountId", (q) =>
        q.eq("provider", provider).eq("providerAccountId", providerAccountId)
      )
      .unique();
    if (account === null) {
      return null;
    }
    return await ctx.db.get(account.userId);
  },
});

export const getUserByEmail = adapterQuery({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    return await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", email))
      .unique();
  },
});

export const updateUser = adapterMutation({
  args: {
    user: v.object({
      id: v.id("users"),
      ...partial(userSchema),
    }),
  },
  handler: async (ctx, { user: { id, ...data } }) => {
    const user = await ctx.db.get(id);
    if (user === null) {
      return;
    }
    await ctx.db.patch(user._id, data);
  },
});
