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
import type * as adapters_account from "../adapters/account.js";
import type * as adapters_authenticator from "../adapters/authenticator.js";
import type * as adapters_session from "../adapters/session.js";
import type * as adapters_user from "../adapters/user.js";
import type * as adapters_utils from "../adapters/utils.js";
import type * as adapters_verificationToken from "../adapters/verificationToken.js";
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
  "adapters/account": typeof adapters_account;
  "adapters/authenticator": typeof adapters_authenticator;
  "adapters/session": typeof adapters_session;
  "adapters/user": typeof adapters_user;
  "adapters/utils": typeof adapters_utils;
  "adapters/verificationToken": typeof adapters_verificationToken;
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
