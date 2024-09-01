import { adapterMutation, adapterQuery } from "./utils";
import { v } from "convex/values";
import { sessionSchema } from "@/convex/schema";

export const createSession = adapterMutation({
  args: { session: v.object(sessionSchema) },
  handler: async (ctx, { session }) => {
    return await ctx.db.insert("sessions", session);
  },
});

export const deleteSession = adapterMutation({
  args: { sessionToken: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("sessionToken", (q) => q.eq("sessionToken", args.sessionToken))
      .unique();
    if (session === null) {
      return null;
    }
    await ctx.db.delete(session._id);
    return session;
  },
});

export const getSessionAndUser = adapterQuery({
  args: { sessionToken: v.string() },
  handler: async (ctx, { sessionToken }) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("sessionToken", (q) => q.eq("sessionToken", sessionToken))
      .unique();
    if (session === null) {
      return null;
    }
    const user = await ctx.db.get(session.userId);
    if (user === null) {
      return null;
    }
    return { session, user };
  },
});

export const updateSession = adapterMutation({
  args: {
    session: v.object({
      expires: v.number(),
      sessionToken: v.string(),
    }),
  },
  handler: async (ctx, { session }) => {
    const existingSession = await ctx.db
      .query("sessions")
      .withIndex("sessionToken", (q) =>
        q.eq("sessionToken", session.sessionToken)
      )
      .unique();
    if (existingSession === null) {
      return null;
    }
    await ctx.db.patch(existingSession._id, session);
  },
});
