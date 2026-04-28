import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "@/database/db";
import * as schema from "@/database/schema";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET as string,
  baseUrl: process.env.BETTER_AUTH_URL as string,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      pkce: false,
    },
  },
  user: {
    additionalFields: {
      username: {
        type: "string",
        required: false,
      },
      contact: {
        type: "string",
        required: false,
      },
    },
  },
});
