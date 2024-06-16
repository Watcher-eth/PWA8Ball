import { InferModel, relations, sql } from "drizzle-orm";
import {
  boolean,
  foreignKey,
  int,
  json,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  // User internal id (can be different from external auth provider id)
  internal_id: varchar("internal_id", { length: 191 }).primaryKey().notNull(),
  // Push notification subscription for PWA
  web_push_subscription: json("subscription"),
  // Timestamps for record keeping
  created_at: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
    .onUpdateNow(),
  // Profile handle (unique string)
  address: varchar("profileHandle", { length: 191 }).unique(),

  // Profile manager (boolean, default: false)
  wasInvited: boolean("wasInvited").default(false),
  notifications: json("notifications").default([]), // Default to an empty array

  // Is normie (boolean, default: false)
  accountType: varchar("accountType", { length: 191 }),
  lens_authentication_token: varchar("lens_authentication_token", {
    length: 255,
  }),
});

export const invites = mysqlTable("invites", {
  // Unique ID for each invite
  id: varchar("id", { length: 36 }).primaryKey().notNull(),

  // User ID associated with the invite
  user_id: varchar("user_id", { length: 191 }).notNull(),

  // Invite code in the format 'bl-randomCharacters'
  invite_code: varchar("invite_code", { length: 255 }).unique().notNull(),

  // Invite status (used or unused)
  status: varchar("status", { length: 10 }).default("unused").notNull(),

  // Timestamp for when the invite was created
  created_at: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),

  // Add more fields if needed for your use case

  // Timestamps for record keeping
  updated_at: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
    .onUpdateNow(),
});

export const submissions = mysqlTable("submissions", {
  // Unique ID for each submission
  id: varchar("id", { length: 36 }).primaryKey().notNull(),

  // Ethereum address for the submission
  submission_address: varchar("submission_address", { length: 42 }).notNull(),

  // Contest field as a string
  contest: varchar("contest", { length: 191 }).notNull(),

  // Ethereum address of the creator
  creator: varchar("creator", { length: 42 }).notNull(),

  // Current price of the submission
  current_price: int("current_price").default(0),

  // Number of votes for the submission
  amount_of_votes: int("amount_of_votes").default(0),

  // Timestamps for record keeping
  created_at: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
    .onUpdateNow(),
});

export const voters = mysqlTable("voters", {
  // Unique ID for each voter record
  id: varchar("id", { length: 36 }).primaryKey().notNull(),

  // Ethereum address of the voter (assuming this maps to users.internal_id)
  user_id: varchar("user_id", { length: 191 }).notNull(),

  // Ethereum address of the submission
  submission_address: varchar("submission_address", { length: 42 }).notNull(),

  // Ethereum address of the voter
  address: varchar("address", { length: 42 }).notNull(),

  // Amount of votes held by the voter for this submission
  amount: int("amount").notNull(),

  // Price paid for the votes
  buy_price: int("buy_price").notNull(),

  isBuy: boolean("isBuy").notNull(),
  // Timestamps for record keeping
  created_at: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
    .onUpdateNow(),
});
//👇 Define relations
export const usersRelations = relations(users, ({ many }) => ({
  invites: many(invites),
}));

export const invitesRelations = relations(invites, ({ one }) => ({
  // Create a "many-to-one" relation from invites to users
  user: one(users, {
    fields: [invites.user_id],
    references: [users.internal_id],
  }),
}));

export const submissionsRelations = relations(submissions, ({ many }) => ({
  voters: many(voters),
}));

export const votersRelations = relations(voters, ({ one }) => ({
  submission: one(submissions, {
    fields: [voters.submission_address, voters.contest],
    references: [submissions.submission_address, submissions.contest],
  }),
}));

export type Invite = InferModel<typeof invites>; // return type when queried
export type NewInvite = InferModel<typeof invites, "insert">; // insert type

export type NewUser = InferModel<typeof users, "insert">; // insert type

export type User = InferModel<typeof users>; // return type when queried

export type Submission = InferModel<typeof submissions>; // return type when queried
export type NewSubmission = InferModel<typeof submissions, "insert">; // insert type

export type Voter = InferModel<typeof voters>; // return type when queried
export type NewVoter = InferModel<typeof voters, "insert">; // insert type
