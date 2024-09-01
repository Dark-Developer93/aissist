/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as adapters_auth_account from "../adapters/auth/account.js";
import type * as adapters_auth_authenticator from "../adapters/auth/authenticator.js";
import type * as adapters_auth_session from "../adapters/auth/session.js";
import type * as adapters_auth_user from "../adapters/auth/user.js";
import type * as adapters_auth_utils from "../adapters/auth/utils.js";
import type * as adapters_auth_verificationToken from "../adapters/auth/verificationToken.js";
import type * as queries_tasks from "../queries/tasks.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "adapters/auth/account": typeof adapters_auth_account;
  "adapters/auth/authenticator": typeof adapters_auth_authenticator;
  "adapters/auth/session": typeof adapters_auth_session;
  "adapters/auth/user": typeof adapters_auth_user;
  "adapters/auth/utils": typeof adapters_auth_utils;
  "adapters/auth/verificationToken": typeof adapters_auth_verificationToken;
  "queries/tasks": typeof queries_tasks;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
