// Shared helper for proxying requests to the Express backend
export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function proxyRequest(
  req: Request,
  path: string,
  options?: RequestInit
): Promise<Response> {
  const url = new URL(req.url);
  const targetUrl = `${API_BASE}${path}${url.search}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Forward Authorization header if present
  const auth = req.headers.get("authorization");
  if (auth) headers["Authorization"] = auth;

  return fetch(targetUrl, {
    method: req.method,
    headers,
    body: ["GET", "HEAD"].includes(req.method) ? undefined : await req.text(),
    ...options,
  });
}
