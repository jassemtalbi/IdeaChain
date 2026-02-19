import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ideas, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { MOCK_IDEAS } from "@/lib/mock/ideas";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Check mock data first
    const mockIdea = MOCK_IDEAS.find((i) => i.id === id);
    if (mockIdea) return NextResponse.json(mockIdea);

    const row = await db
      .select({
        id: ideas.id,
        userId: ideas.userId,
        title: ideas.title,
        rawIdea: ideas.rawIdea,
        blueprint: ideas.blueprint,
        tags: ideas.tags,
        voteCount: ideas.voteCount,
        commentCount: ideas.commentCount,
        createdAt: ideas.createdAt,
        userName: users.name,
        userAvatar: users.avatar,
        userWallet: users.walletAddress,
      })
      .from(ideas)
      .leftJoin(users, eq(ideas.userId, users.id))
      .where(eq(ideas.id, id))
      .get();

    if (!row) {
      return NextResponse.json({ error: "Idea not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: row.id,
      userId: row.userId,
      title: row.title,
      rawIdea: row.rawIdea,
      blueprint: JSON.parse(row.blueprint),
      tags: JSON.parse(row.tags),
      voteCount: row.voteCount || 0,
      commentCount: row.commentCount || 0,
      createdAt: row.createdAt,
      user: row.userName ? {
        id: row.userId,
        name: row.userName,
        avatar: row.userAvatar,
        walletAddress: row.userWallet,
        createdAt: row.createdAt,
      } : undefined,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch idea" }, { status: 500 });
  }
}
