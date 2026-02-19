import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { comments, users } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const ideaId = searchParams.get("ideaId");

    if (!ideaId) return NextResponse.json({ error: "ideaId required" }, { status: 400 });

    const rows = await db
      .select({
        id: comments.id,
        ideaId: comments.ideaId,
        userId: comments.userId,
        content: comments.content,
        createdAt: comments.createdAt,
        userName: users.name,
        userAvatar: users.avatar,
      })
      .from(comments)
      .leftJoin(users, eq(comments.userId, users.id))
      .where(eq(comments.ideaId, ideaId))
      .orderBy(desc(comments.createdAt));

    return NextResponse.json(rows.map((r) => ({
      id: r.id,
      ideaId: r.ideaId,
      userId: r.userId,
      content: r.content,
      createdAt: r.createdAt,
      user: r.userName ? { id: r.userId, name: r.userName, avatar: r.userAvatar, createdAt: r.createdAt } : undefined,
    })));
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { ideaId, content } = await req.json();

    if (!ideaId || !content?.trim()) {
      return NextResponse.json({ error: "ideaId and content required" }, { status: 400 });
    }

    const userId = (session?.user as any)?.id || "anonymous";
    const id = nanoid();

    await db.insert(comments).values({
      id,
      ideaId,
      userId,
      content: content.trim(),
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ id, success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
  }
}
