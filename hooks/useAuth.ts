"use client";

import { useAuthContext } from "@/lib/authContext";
import { User } from "@/types";

export function useAuth() {
  const { user, token, isLoading, login, register, logout } = useAuthContext();

  const currentUser: User | null = user
    ? { id: user.id, email: user.email, name: user.name, avatar: user.avatar, createdAt: "" }
    : null;

  return {
    isAuthenticated: !!user,
    isLoading,
    currentUser,
    token,
    login,
    register,
    logout,
  };
}
