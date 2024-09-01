import type { AdapterAccount } from "@auth/core/adapters";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { callMutation, callQuery } from "./utils";

type Account = AdapterAccount & { userId: Id<"users"> };

export async function getAccount(providerAccountId: string, provider: string) {
  return await callQuery(api.adapters.auth.account.getAccount, {
    provider,
    providerAccountId,
  });
}

export async function linkAccount(account: Account) {
  return await callMutation(api.adapters.auth.account.linkAccount, {
    account,
  });
}

export async function unlinkAccount({
  provider,
  providerAccountId,
}: {
  provider: string;
  providerAccountId: string;
}) {
  return (
    (await callMutation(api.adapters.auth.account.unlinkAccount, {
      provider,
      providerAccountId,
    })) ?? undefined
  );
}
