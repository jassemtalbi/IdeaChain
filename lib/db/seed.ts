import { db } from "./index";
import { users, ideas, comments, votes } from "./schema";
import { MOCK_IDEAS } from "../mock/ideas";
import { nanoid } from "nanoid";

async function seed() {
  console.log("Seeding database...");

  // Insert users
  for (const idea of MOCK_IDEAS) {
    if (!idea.user) continue;
    try {
      await db.insert(users).values({
        id: idea.user.id,
        name: idea.user.name,
        walletAddress: idea.user.walletAddress,
        avatar: idea.user.avatar,
        createdAt: idea.user.createdAt,
      }).onConflictDoNothing();
    } catch {}
  }

  // Insert ideas
  for (const idea of MOCK_IDEAS) {
    try {
      await db.insert(ideas).values({
        id: idea.id,
        userId: idea.userId,
        title: idea.title,
        rawIdea: idea.rawIdea,
        blueprint: JSON.stringify(idea.blueprint),
        tags: JSON.stringify(idea.tags),
        voteCount: idea.voteCount,
        commentCount: idea.commentCount,
        createdAt: idea.createdAt,
      }).onConflictDoNothing();
    } catch {}
  }

  // Insert sample comments
  const sampleComments = [
    { ideaId: "mock-001", content: "This is exactly what the education space needs! The credential NFT idea is brilliant." },
    { ideaId: "mock-001", content: "How will you handle disputes between tutors and students? The DAO mechanism seems promising." },
    { ideaId: "mock-002", content: "Finally! Uber drivers deserve better. The 0% commission model will attract so many drivers." },
    { ideaId: "mock-003", content: "The on-chain reputation system is the killer feature here. LinkedIn's monopoly on professional reputation needs disruption." },
    { ideaId: "mock-003", content: "Have you considered integrating with Gitcoin for quadratic funding of new features?" },
  ];

  for (const comment of sampleComments) {
    const randomUser = MOCK_IDEAS[Math.floor(Math.random() * MOCK_IDEAS.length)].user!;
    try {
      await db.insert(comments).values({
        id: nanoid(),
        ideaId: comment.ideaId,
        userId: randomUser.id,
        content: comment.content,
        createdAt: new Date().toISOString(),
      }).onConflictDoNothing();
    } catch {}
  }

  console.log("Seeding complete!");
}

seed().catch(console.error);
