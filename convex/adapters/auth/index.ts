import { Adapter } from "@auth/core/adapters";
import * as account from "./account";
import * as authenticator from "./authenticator";
import * as session from "./session";
import * as user from "./user";
import * as verificationToken from "./verificationToken";

export const ConvexAdapter: Adapter = {
  createAuthenticator: authenticator.createAuthenticator,
  createSession: session.createSession,
  createUser: user.createUser,
  createVerificationToken: verificationToken.createVerificationToken,
  deleteSession: session.deleteSession,
  deleteUser: user.deleteUser,
  getAccount: account.getAccount,
  getAuthenticator: authenticator.getAuthenticator,
  getSessionAndUser: session.getSessionAndUser,
  getUser: user.getUser,
  getUserByAccount: user.getUserByAccount,
  getUserByEmail: user.getUserByEmail,
  linkAccount: account.linkAccount,
  listAuthenticatorsByUserId: authenticator.listAuthenticatorsByUserId,
  unlinkAccount: account.unlinkAccount,
  updateAuthenticatorCounter: authenticator.updateAuthenticatorCounter,
  updateSession: session.updateSession,
  updateUser: user.updateUser,
  useVerificationToken: verificationToken.useVerificationToken,
};
