import { adapterMutation } from "./utils";
import { v } from "convex/values";
import { verificationTokenSchema } from "../schema";

export const createVerificationToken = adapterMutation({
  args: { verificationToken: v.object(verificationTokenSchema) },
  handler: async (ctx, { verificationToken }) => {
    return await ctx.db.insert("verificationTokens", verificationToken);
  },
});

export const useVerificationToken = adapterMutation({
  args: { identifier: v.string(), token: v.string() },
  handler: async (ctx, { identifier, token }) => {
    const verificationToken = await ctx.db
      .query("verificationTokens")
      .withIndex("identifierToken", (q) =>
        q.eq("identifier", identifier).eq("token", token)
      )
      .unique();
    if (verificationToken === null) {
      return null;
    }
    await ctx.db.delete(verificationToken._id);
    return verificationToken;
  },
});
