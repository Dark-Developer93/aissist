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
import type * as adapters_convex_account from "../adapters/convex/account.js";
import type * as adapters_convex_authenticator from "../adapters/convex/authenticator.js";
import type * as adapters_convex_index from "../adapters/convex/index.js";
import type * as adapters_convex_session from "../adapters/convex/session.js";
import type * as adapters_convex_user from "../adapters/convex/user.js";
import type * as adapters_convex_utils from "../adapters/convex/utils.js";
import type * as adapters_convex_verificationToken from "../adapters/convex/verificationToken.js";
import type * as auth from "../auth.js";
import type * as http from "../http.js";
import type * as queries_ai from "../queries/ai.js";
import type * as queries_labels from "../queries/labels.js";
import type * as queries_projects from "../queries/projects.js";
import type * as queries_subTodos from "../queries/subTodos.js";
import type * as queries_todos from "../queries/todos.js";

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
  "adapters/convex/account": typeof adapters_convex_account;
  "adapters/convex/authenticator": typeof adapters_convex_authenticator;
  "adapters/convex/index": typeof adapters_convex_index;
  "adapters/convex/session": typeof adapters_convex_session;
  "adapters/convex/user": typeof adapters_convex_user;
  "adapters/convex/utils": typeof adapters_convex_utils;
  "adapters/convex/verificationToken": typeof adapters_convex_verificationToken;
  auth: typeof auth;
  http: typeof http;
  "queries/ai": typeof queries_ai;
  "queries/labels": typeof queries_labels;
  "queries/projects": typeof queries_projects;
  "queries/subTodos": typeof queries_subTodos;
  "queries/todos": typeof queries_todos;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
