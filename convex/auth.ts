import { Auth } from "convex/server";

import { Id } from "@/convex/_generated/dataModel";

async function getViewerId(ctx: { auth: Auth }) {
  const identity = await ctx.auth.getUserIdentity();

  if (identity === null) {
    return null;
  }

  return identity.subject as Id<"users">;
}

export async function handleUserId(ctx: { auth: Auth }) {
  return getViewerId(ctx);
}
