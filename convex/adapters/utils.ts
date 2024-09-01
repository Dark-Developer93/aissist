import {
  customMutation,
  customQuery,
} from "convex-helpers/server/customFunctions";
import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

export const adapterQuery = customQuery(query, {
  args: { secret: v.string() },
  input: async (_ctx, { secret }) => {
    checkSecret(secret);
    return { ctx: {}, args: {} };
  },
});

export const adapterMutation = customMutation(mutation, {
  args: { secret: v.string() },
  input: async (_ctx, { secret }) => {
    checkSecret(secret);
    return { ctx: {}, args: {} };
  },
});

function checkSecret(secret: string) {
  if (secret !== process.env.CONVEX_AUTH_ADAPTER_SECRET) {
    throw new Error("Adapter API called without correct secret value");
  }
}
