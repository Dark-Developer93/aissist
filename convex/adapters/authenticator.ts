import { adapterMutation, adapterQuery } from "./utils";
import { v } from "convex/values";
import { authenticatorSchema } from "../schema";

export const createAuthenticator = adapterMutation({
  args: { authenticator: v.object(authenticatorSchema) },
  handler: async (ctx, args) => {
    return await ctx.db.insert("authenticators", args.authenticator);
  },
});

export const getAuthenticator = adapterQuery({
  args: { credentialID: v.string() },
  handler: async (ctx, { credentialID }) => {
    return await ctx.db
      .query("authenticators")
      .withIndex("credentialID", (q) => q.eq("credentialID", credentialID))
      .unique();
  },
});

export const listAuthenticatorsByUserId = adapterQuery({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("authenticators")
      .withIndex("userId", (q) => q.eq("userId", userId))
      .collect();
  },
});

export const updateAuthenticatorCounter = adapterMutation({
  args: { credentialID: v.string(), newCounter: v.number() },
  handler: async (ctx, { credentialID, newCounter }) => {
    const authenticator = await ctx.db
      .query("authenticators")
      .withIndex("credentialID", (q) => q.eq("credentialID", credentialID))
      .unique();
    if (authenticator === null) {
      throw new Error(
        `Authenticator not found for credentialID: ${credentialID}`
      );
    }
    await ctx.db.patch(authenticator._id, { counter: newCounter });
    return { ...authenticator, counter: newCounter };
  },
});
