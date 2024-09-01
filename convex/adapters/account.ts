import { adapterMutation, adapterQuery } from "./utils";
import { v } from "convex/values";
import { accountSchema } from "../schema";

export const getAccount = adapterQuery({
  args: { provider: v.string(), providerAccountId: v.string() },
  handler: async (ctx, { provider, providerAccountId }) => {
    return await ctx.db
      .query("accounts")
      .withIndex("providerAndAccountId", (q) =>
        q.eq("provider", provider).eq("providerAccountId", providerAccountId)
      )
      .unique();
  },
});

export const linkAccount = adapterMutation({
  args: { account: v.object(accountSchema) },
  handler: async (ctx, { account }) => {
    const id = await ctx.db.insert("accounts", account);
    return await ctx.db.get(id);
  },
});

export const unlinkAccount = adapterMutation({
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
    await ctx.db.delete(account._id);
    return account;
  },
});
