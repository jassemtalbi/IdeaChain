"use client";

import { useSession } from "next-auth/react";
import { User } from "@/types";

export function useAuth() {
  const { data: session, status } = useSession();
  const isAuthenticated = session?.user ? true : false;
  const isLoading = status === "loading";

  let currentUser: User | null = null;
  if (session?.user) {
    currentUser = {
      id: (session.user as any).id || session.user.email || "unknown",
      email: session.user.email || undefined,
      name: session.user.name || undefined,
      avatar: session.user.image || undefined,
      createdAt: new Date().toISOString(),
    };
  }
  return { isAuthenticated, isLoading, currentUser, session };
}
