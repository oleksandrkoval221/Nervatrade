import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
// @ts-ignore
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

// providers
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import AppleProvider from "next-auth/providers/apple";
import EmailProvider from "next-auth/providers/email"

import dbConnect from "./dbConnect";
import clientPromise from "./clientPromise";
// @ts-ignore
import bcrypt from "bcryptjs";
import User from "../models/User";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET!,
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
 
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
    }),
    
    AppleProvider({
      clientId: process.env.APPLE_ID!,
      clientSecret: process.env.APPLE_SECRET!
    }),
   
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        secureConnection: false,
        requiresAuth: true,
        domains: ["gmail.com", "googlemail.com"],
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        },  
        tls: { rejectUnauthorized: false }
      },
      from: process.env.EMAIL_FROM,
      maxAge: 2 * 60 * 60, // How long email links are valid for (default 24h)
    }),
   
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await dbConnect();
        // Add logic here to look up the user from the credentials supplied
        if (credentials == null) return null;
        
        try {
          const user = await User.findOne({ email: credentials.email });

          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password,
            );
            if (isMatch) {
              return user;
            } else {
              throw new Error("Email or password is incorrect");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    newUser: "/dashboard",
    error: "/login",
    verifyRequest: '/verify-request',
  },
  callbacks: {
    // We can pass in additional information from the user document MongoDB returns
    async jwt({ token, user }: any) {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          name: user.name,
        };
      }
      return token;
    },
    // If we want to access our extra user info from sessions we have to pass it the token here to get them in sync:
    session: async ({ session, token }: any) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
