import type { AdapterSession } from "@auth/core/adapters";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
  callMutation,
  callQuery,
  maybeSessionFromDB,
  sessionFromDB,
  toDB,
  userFromDB,
} from "./utils";

type Session = AdapterSession & { userId: Id<"users"> };

export async function createSession(session: Session) {
  const id = await callMutation(api.adapters.auth.session.createSession, {
    session: toDB(session),
  });
  return { ...session, id };
}

export async function deleteSession(sessionToken: string) {
  return maybeSessionFromDB(
    await callMutation(api.adapters.auth.session.deleteSession, {
      sessionToken,
    })
  );
}

export async function getSessionAndUser(sessionToken: string) {
  const result = await callQuery(api.adapters.auth.session.getSessionAndUser, {
    sessionToken,
  });
  if (result === null) {
    return null;
  }
  const { user, session } = result;
  return { user: userFromDB(user), session: sessionFromDB(session) };
}

export async function updateSession(session: Session) {
  return await callMutation(api.adapters.auth.session.updateSession, {
    session: toDB(session),
  });
}
