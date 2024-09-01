"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { ConvexProviderWithAuth, ConvexReactClient } from "convex/react";
import { useConvexAuth } from "../../hooks/useConvexAuth";

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
      <ConvexProviderWithAuth client={convex} useAuth={useConvexAuth}>
        <div>{children}</div>
      </ConvexProviderWithAuth>
    </SessionProvider>
  );
}
