"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("ideachain_token");
    if (stored) {
      setToken(stored);
      fetch(API_BASE + "/api/auth/me", {
        headers: { Authorization: "Bearer " + stored },
      })
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (data) setUser({ id: data.id, email: data.email, name: data.name, avatar: data.avatar });
          else { localStorage.removeItem("ideachain_token"); setToken(null); }
        })
        .catch(() => { localStorage.removeItem("ideachain_token"); setToken(null); })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch(API_BASE + "/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");
    localStorage.setItem("ideachain_token", data.token);
    setToken(data.token);
    setUser({ id: data.user.id, email: data.user.email, name: data.user.name, avatar: data.user.avatar });
  };

  const register = async (email: string, name: string, password: string) => {
    const res = await fetch(API_BASE + "/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Registration failed");
    localStorage.setItem("ideachain_token", data.token);
    setToken(data.token);
    setUser({ id: data.user.id, email: data.user.email, name: data.user.name, avatar: data.user.avatar });
  };

  const logout = () => {
    localStorage.removeItem("ideachain_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
  return ctx;
}
