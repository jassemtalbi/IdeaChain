export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("ideachain_token");
}

export function authHeaders(): Record<string, string> {
  const token = getToken();
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = "Bearer " + token;
  return headers;
}
