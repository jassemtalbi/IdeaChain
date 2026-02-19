import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { votes, ideas } from "@/lib/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { ideaId } = await req.json();

    if (!ideaId) {
      return NextResponse.json({ error: "ideaId required" }, { status: 400 });
    }

    const userId = (session?.user as any)?.id || "anonymous";

    // Check existing vote
    const existing = await db
      .select()
      .from(votes)
      .where(and(eq(votes.ideaId, ideaId), eq(votes.userId, userId)))
      .get();

    if (existing) {
      // Toggle off
      await db.delete(votes).where(eq(votes.id, existing.id));
      await db.update(ideas)
        .set({ voteCount: sql`${ideas.voteCount} - 1` })
        .where(eq(ideas.id, ideaId));
      return NextResponse.json({ voted: false });
    } else {
      // Vote
      await db.insert(votes).values({ id: nanoid(), ideaId, userId, createdAt: new Date().toISOString() });
      await db.update(ideas)
        .set({ voteCount: sql`${ideas.voteCount} + 1` })
        .where(eq(ideas.id, ideaId));
      return NextResponse.json({ voted: true });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to vote" }, { status: 500 });
  }
}
