import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        // For MVP: auto-create user on first login
        const existing = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email))
          .get();

        if (existing) {
          return {
            id: existing.id,
            email: existing.email,
            name: existing.name,
            image: existing.avatar,
          };
        }

        // Create new user
        const newUser = {
          id: nanoid(),
          email: credentials.email,
          name: credentials.email.split("@")[0],
          avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${credentials.email}`,
          createdAt: new Date().toISOString(),
        };

        await db.insert(users).values(newUser);

        return {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          image: newUser.avatar,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};
