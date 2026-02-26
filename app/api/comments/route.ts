import { NextRequest } from 'next/server';
const API_BASE = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000';

async function handler(req: NextRequest) {
  const url = new URL(req.url);
  const target = API_BASE + '/api/comments' + url.search;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const auth = req.headers.get('authorization');
  if (auth) headers['Authorization'] = auth;
  const res = await fetch(target, {
    method: req.method,
    headers,
    body: req.method !== 'GET' ? await req.text() : undefined,
  });
  const text = await res.text();
  return new Response(text, { status: res.status, headers: { 'Content-Type': 'application/json' } });
}

export const GET = handler;
export const POST = handler;