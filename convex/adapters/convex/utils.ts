import { fetchMutation, fetchQuery } from "convex/nextjs";
import { FunctionArgs, FunctionReference } from "convex/server";
import { Doc } from "@/convex/_generated/dataModel";

export function callQuery<Query extends FunctionReference<"query">>(
  query: Query,
  args: Omit<FunctionArgs<Query>, "secret">
) {
  return fetchQuery(query, addSecret(args) as any);
}

export function callMutation<Mutation extends FunctionReference<"mutation">>(
  mutation: Mutation,
  args: Omit<FunctionArgs<Mutation>, "secret">
) {
  return fetchMutation(mutation, addSecret(args) as any);
}

if (process.env.CONVEX_AUTH_ADAPTER_SECRET === undefined) {
  throw new Error("Missing CONVEX_AUTH_ADAPTER_SECRET environment variable");
}

function addSecret(args: Record<string, any>) {
  return { ...args, secret: process.env.CONVEX_AUTH_ADAPTER_SECRET! };
}

export function maybeUserFromDB(user: Doc<"users"> | null) {
  if (user === null) {
    return null;
  }
  return userFromDB(user);
}

export function userFromDB(user: Doc<"users">) {
  return {
    ...user,
    id: user._id,
    emailVerified: maybeDate(user.emailVerified),
  };
}

export function maybeSessionFromDB(session: Doc<"sessions"> | null) {
  if (session === null) {
    return null;
  }
  return sessionFromDB(session);
}

export function sessionFromDB(session: Doc<"sessions">) {
  return { ...session, id: session._id, expires: new Date(session.expires) };
}

export function maybeVerificationTokenFromDB(
  verificationToken: Doc<"verificationTokens"> | null
) {
  if (verificationToken === null) {
    return null;
  }
  return verificationTokenFromDB(verificationToken);
}

export function verificationTokenFromDB(
  verificationToken: Doc<"verificationTokens">
) {
  return { ...verificationToken, expires: new Date(verificationToken.expires) };
}

export function maybeDate(value: number | undefined) {
  return value === undefined ? null : new Date(value);
}

export function toDB<T extends object>(
  obj: T
): {
  [K in keyof T]: T[K] extends Date
    ? number
    : null extends T[K]
      ? undefined
      : T[K];
} {
  const result: any = {};
  for (const key in obj) {
    const value = obj[key];
    result[key] =
      value instanceof Date
        ? value.getTime()
        : value === null
          ? undefined
          : value;
  }
  return result;
}
