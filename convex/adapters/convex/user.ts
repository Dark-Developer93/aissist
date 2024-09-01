import type { AdapterUser } from "@auth/core/adapters";

import { api } from "@/convex/_generated/api";
import { callMutation, callQuery, maybeUserFromDB, toDB } from "./utils";
import { Id } from "@/convex/_generated/dataModel";

type User = AdapterUser & { id: Id<"users"> };

export async function createUser({ id: _, ...user }: User) {
  const id = await callMutation(api.adapters.auth.user.createUser, {
    user: toDB(user),
  });
  return { ...user, id };
}

export async function deleteUser(id: Id<"users">) {
  return maybeUserFromDB(
    await callMutation(api.adapters.auth.user.deleteUser, { id })
  );
}

export async function getUser(id: Id<"users">) {
  return maybeUserFromDB(
    await callQuery(api.adapters.auth.user.getUser, { id })
  );
}

export async function getUserByAccount({
  provider,
  providerAccountId,
}: {
  provider: string;
  providerAccountId: string;
}) {
  return maybeUserFromDB(
    await callQuery(api.adapters.auth.user.getUserByAccount, {
      provider,
      providerAccountId,
    })
  );
}

export async function getUserByEmail(email: string) {
  return maybeUserFromDB(
    await callQuery(api.adapters.auth.user.getUserByEmail, { email })
  );
}

export async function updateUser(user: User) {
  await callMutation(api.adapters.auth.user.updateUser, { user: toDB(user) });
  return user;
}
