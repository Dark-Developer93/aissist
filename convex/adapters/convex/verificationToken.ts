import type { VerificationToken } from "@auth/core/adapters";

import { api } from "@/convex/_generated/api";
import { callMutation, maybeVerificationTokenFromDB, toDB } from "./utils";

export async function createVerificationToken(
  verificationToken: VerificationToken
) {
  await callMutation(
    api.adapters.auth.verificationToken.createVerificationToken,
    {
      verificationToken: toDB(verificationToken),
    }
  );
  return verificationToken;
}

export async function useVerificationToken({
  identifier,
  token,
}: {
  identifier: string;
  token: string;
}) {
  return maybeVerificationTokenFromDB(
    await callMutation(
      api.adapters.auth.verificationToken.useVerificationToken,
      {
        identifier,
        token,
      }
    )
  );
}
