import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ideas, users, votes } from "@/lib/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { MOCK_IDEAS } from "@/lib/mock/ideas";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sort = searchParams.get("sort") || "recent";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 12;
    const offset = (page - 1) * limit;

    // Try DB first, fall back to mock data
    try {
      const orderBy = sort === "votes" ? desc(ideas.voteCount) : desc(ideas.createdAt);

      const rows = await db
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
        .where(eq(ideas.isPublic, true))
        .orderBy(orderBy)
        .limit(limit)
        .offset(offset);

      if (rows.length === 0) {
        return NextResponse.json(MOCK_IDEAS.slice(offset, offset + limit));
      }

      const result = rows.map((row) => ({
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
      }));

      return NextResponse.json(result);
    } catch {
      return NextResponse.json(MOCK_IDEAS.slice(offset, offset + limit));
    }
  } catch (error) {
    return NextResponse.json(MOCK_IDEAS);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { title, rawIdea, blueprint, tags } = body;

    if (!rawIdea || !blueprint) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const userId = (session?.user as any)?.id || "anonymous";
    const id = nanoid();

    await db.insert(ideas).values({
      id,
      userId,
      title: title || rawIdea.slice(0, 80),
      rawIdea,
      blueprint: JSON.stringify(blueprint),
      tags: JSON.stringify(tags || []),
      voteCount: 0,
      commentCount: 0,
      isPublic: true,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ id, success: true });
  } catch (error) {
    console.error("Create idea error:", error);
    return NextResponse.json({ error: "Failed to save idea" }, { status: 500 });
  }
}
