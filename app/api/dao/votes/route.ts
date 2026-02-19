import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { db } from "@/lib/db";
import { daoProposals, daoVotes, users } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";

// POST /api/dao/votes — cast or change a vote on a proposal
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { proposalId, choice } = await req.json();
  if (!proposalId || !["for", "against", "abstain"].includes(choice)) {
    return NextResponse.json({ error: "proposalId and valid choice required" }, { status: 400 });
  }

  const user = await db.select().from(users).where(eq(users.email, session.user.email)).limit(1);
  if (!user[0]) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const [proposal] = await db.select().from(daoProposals).where(eq(daoProposals.id, proposalId)).limit(1);
  if (!proposal) return NextResponse.json({ error: "Proposal not found" }, { status: 404 });
  if (proposal.status !== "open") return NextResponse.json({ error: "Proposal is not open" }, { status: 400 });
  if (new Date(proposal.endsAt) < new Date()) return NextResponse.json({ error: "Proposal has expired" }, { status: 400 });

  const existing = await db
    .select()
    .from(daoVotes)
    .where(and(eq(daoVotes.proposalId, proposalId), eq(daoVotes.userId, user[0].id)))
    .limit(1);

  if (existing[0]) {
    const oldChoice = existing[0].choice;
    if (oldChoice === choice) return NextResponse.json({ choice, changed: false });

    // Decrement old, increment new
    const dec: Record<string, number> = { votesFor: proposal.votesFor ?? 0, votesAgainst: proposal.votesAgainst ?? 0, votesAbstain: proposal.votesAbstain ?? 0 };
    const colMap: Record<string, keyof typeof dec> = { for: "votesFor", against: "votesAgainst", abstain: "votesAbstain" };
    dec[colMap[oldChoice]] = Math.max(0, (dec[colMap[oldChoice]] as number) - 1);
    dec[colMap[choice]] = (dec[colMap[choice]] as number) + 1;

    await db.update(daoProposals).set({
      votesFor: dec.votesFor,
      votesAgainst: dec.votesAgainst,
      votesAbstain: dec.votesAbstain,
    }).where(eq(daoProposals.id, proposalId));
    await db.update(daoVotes).set({ choice }).where(eq(daoVotes.id, existing[0].id));
  } else {
    // New vote — increment the right column
    const current = { votesFor: proposal.votesFor ?? 0, votesAgainst: proposal.votesAgainst ?? 0, votesAbstain: proposal.votesAbstain ?? 0 };
    if (choice === "for") current.votesFor += 1;
    else if (choice === "against") current.votesAgainst += 1;
    else current.votesAbstain += 1;

    await db.update(daoProposals).set(current).where(eq(daoProposals.id, proposalId));
    await db.insert(daoVotes).values({ id: nanoid(), proposalId, userId: user[0].id, choice });
  }

  const [updated] = await db.select().from(daoProposals).where(eq(daoProposals.id, proposalId)).limit(1);
  return NextResponse.json({ choice, changed: true, proposal: updated });
}
