import type { AdapterAuthenticator } from "@auth/core/adapters";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { callMutation, callQuery } from "./utils";

type Authenticator = AdapterAuthenticator & { userId: Id<"users"> };

export async function createAuthenticator(authenticator: Authenticator) {
  await callMutation(api.adapters.auth.authenticator.createAuthenticator, {
    authenticator,
  } as any);
  return authenticator;
}

export async function getAuthenticator(credentialID: string) {
  return await callQuery(api.adapters.auth.authenticator.getAuthenticator, {
    credentialID,
  });
}

export async function listAuthenticatorsByUserId(userId: Id<"users">) {
  return await callQuery(
    api.adapters.auth.authenticator.listAuthenticatorsByUserId,
    {
      userId,
    }
  );
}

export async function updateAuthenticatorCounter(
  credentialID: string,
  newCounter: number
) {
  return await callMutation(
    api.adapters.auth.authenticator.updateAuthenticatorCounter,
    {
      credentialID,
      newCounter,
    }
  );
}
