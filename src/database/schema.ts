import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false), // ✅ Better Auth requires this
  image: text("image"), // ✅ Better Auth requires this
  createdAt: timestamp("created_at").defaultNow().notNull(), // ✅ must be created_at
  updatedAt: timestamp("updated_at").defaultNow().notNull(), // ✅ must be updated_at

  // your custom fields
  username: text("username").unique(),
  contact: text("contact"),
  role: text("role").default("user").notNull(),
  password: text("password").default(NULL),
});

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(), // ✅ renamed from providerAccountId
  providerId: text("provider_id").notNull(), // ✅ renamed from provider
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"), // ✅ Better Auth requires this
  accessTokenExpiresAt: timestamp("access_token_expires_at"), // ✅ Better Auth requires this
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"), // ✅ Better Auth requires this
  scope: text("scope"), // ✅ Better Auth requires this
  password: text("password"), // ✅ Better Auth requires this
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(), // ✅ Better Auth requires this
  ipAddress: text("ip_address"), // ✅ Better Auth requires this
  userAgent: text("user_agent"), // ✅ Better Auth requires this
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const verifications = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
