import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").unique(),
  walletAddress: text("wallet_address").unique(),
  name: text("name"),
  avatar: text("avatar"),
  passwordHash: text("password_hash"),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

export const ideas = sqliteTable("ideas", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  rawIdea: text("raw_idea").notNull(),
  blueprint: text("blueprint").notNull(),
  tags: text("tags").notNull().default("[]"),
  voteCount: integer("vote_count").default(0),
  commentCount: integer("comment_count").default(0),
  isPublic: integer("is_public", { mode: "boolean" }).default(true),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").default(sql`(datetime('now'))`),
});

export const votes = sqliteTable("votes", {
  id: text("id").primaryKey(),
  ideaId: text("idea_id").references(() => ideas.id, { onDelete: "cascade" }),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

export const comments = sqliteTable("comments", {
  id: text("id").primaryKey(),
  ideaId: text("idea_id").references(() => ideas.id, { onDelete: "cascade" }),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  sessionToken: text("session_token").unique().notNull(),
  expires: text("expires").notNull(),
});

export const accounts = sqliteTable("accounts", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("provider_account_id").notNull(),
  refreshToken: text("refresh_token"),
  accessToken: text("access_token"),
  expiresAt: integer("expires_at"),
  tokenType: text("token_type"),
  scope: text("scope"),
  idToken: text("id_token"),
});

// DAO governance tables
export const daoProposals = sqliteTable("dao_proposals", {
  id: text("id").primaryKey(),
  ideaId: text("idea_id").references(() => ideas.id, { onDelete: "cascade" }),
  authorId: text("author_id").references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  // status: open | passed | rejected | expired
  status: text("status").notNull().default("open"),
  votesFor: integer("votes_for").default(0),
  votesAgainst: integer("votes_against").default(0),
  votesAbstain: integer("votes_abstain").default(0),
  endsAt: text("ends_at").notNull(),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

export const daoVotes = sqliteTable("dao_votes", {
  id: text("id").primaryKey(),
  proposalId: text("proposal_id").references(() => daoProposals.id, { onDelete: "cascade" }),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  // choice: for | against | abstain
  choice: text("choice").notNull(),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});
