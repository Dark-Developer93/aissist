"use server";

import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/loggedin" });
  //   if (result?.error) throw result.error;
  //   return redirect("/");
}

export async function signOutAction() {
  await signOut();
  return redirect("/");
}
