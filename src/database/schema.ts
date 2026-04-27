import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  contact: text("contact").notNull().unique(),
  role: text("role").notNull(),
  password: text("password").notNull(),
  createdDate: timestamp("created_date").defaultNow().notNull(),
  updatedDate: timestamp("updated_date").defaultNow().notNull(),
});

