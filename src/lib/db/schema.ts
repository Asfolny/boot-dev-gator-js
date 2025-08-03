import { pgTable, timestamp, uuid, text, unique } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  name: text("name").notNull().unique(),
});

export const feeds = pgTable("feeds", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
  name: text("name").notNull().unique(),
  url: text("url").notNull().unique(),
  last_fetched_at: timestamp("last_fetched_at"),
  user_id: uuid("user_id").references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
});

export const feedFollows = pgTable("feed_follows", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
  feed_id: uuid("feed_id").references(() => feeds.id, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
  user_id: uuid("user_id").references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
}, (t) => ({
  feed_user_uniq: unique("feed_user_uniq").on(t.feed_id, t.user_id),
}));


export type User = typeof users.$inferSelect;
export type Feed = typeof feeds.$inferSelect;

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  title: text("title").notNull(),
  url: text("url").notNull().unique(),
  description: text("description"),
  publishedAt: timestamp("published_at"),
  feedId: uuid("feed_id")
    .notNull()
    .references(() => feeds.id, { onDelete: "cascade" }),
});

export type NewPost = typeof posts.$inferInsert;
export type Post = typeof posts.$inferSelect;
