"use client";

import { ReactNode } from "react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function Provider({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) {
  return (
    <SessionProvider session={session}>
      <ConvexProvider client={convex}>
        <div>{children}</div>
      </ConvexProvider>
    </SessionProvider>
  );
}
