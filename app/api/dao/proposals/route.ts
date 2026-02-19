import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { db } from "@/lib/db";
import { daoProposals, daoVotes, users } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { nanoid } from "nanoid";

// GET /api/dao/proposals?ideaId=xxx
export async function GET(req: NextRequest) {
  const ideaId = req.nextUrl.searchParams.get("ideaId");
  if (!ideaId) return NextResponse.json({ error: "ideaId required" }, { status: 400 });

  const session = await getServerSession(authOptions);

  const proposals = await db
    .select({
      id: daoProposals.id,
      ideaId: daoProposals.ideaId,
      authorId: daoProposals.authorId,
      title: daoProposals.title,
      description: daoProposals.description,
      status: daoProposals.status,
      votesFor: daoProposals.votesFor,
      votesAgainst: daoProposals.votesAgainst,
      votesAbstain: daoProposals.votesAbstain,
      endsAt: daoProposals.endsAt,
      createdAt: daoProposals.createdAt,
      authorName: users.name,
      authorAvatar: users.avatar,
    })
    .from(daoProposals)
    .leftJoin(users, eq(daoProposals.authorId, users.id))
    .where(eq(daoProposals.ideaId, ideaId))
    .orderBy(desc(daoProposals.createdAt));

  // Attach user's vote if logged in
  let userVotes: Record<string, string> = {};
  if (session?.user?.email) {
    const user = await db.select().from(users).where(eq(users.email, session.user.email)).limit(1);
    if (user[0]) {
      const votes = await db
        .select()
        .from(daoVotes)
        .where(eq(daoVotes.userId, user[0].id));
      votes.forEach((v) => { userVotes[v.proposalId!] = v.choice; });
    }
  }

  const result = proposals.map((p) => ({
    ...p,
    author: { name: p.authorName, avatar: p.authorAvatar },
    userVote: userVotes[p.id] ?? null,
  }));

  return NextResponse.json(result);
}

// POST /api/dao/proposals — create a new proposal
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { ideaId, title, description, durationDays = 7 } = await req.json();
  if (!ideaId || !title?.trim() || !description?.trim()) {
    return NextResponse.json({ error: "ideaId, title and description required" }, { status: 400 });
  }

  const user = await db.select().from(users).where(eq(users.email, session.user.email)).limit(1);
  if (!user[0]) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const endsAt = new Date(Date.now() + durationDays * 86400_000).toISOString();
  const id = nanoid();

  await db.insert(daoProposals).values({
    id,
    ideaId,
    authorId: user[0].id,
    title: title.trim(),
    description: description.trim(),
    endsAt,
  });

  const [proposal] = await db.select().from(daoProposals).where(eq(daoProposals.id, id)).limit(1);
  return NextResponse.json(proposal, { status: 201 });
}
