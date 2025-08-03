import { db } from "..";
import { feeds } from "../schema";
import { eq, sql } from "drizzle-orm";
import { firstOrUndefined } from "./utils";

export async function addFeed(name: string, url: string, user_id: string) {
  const [result] = await db.insert(feeds).values({ name: name, url: url, user_id: user_id }).returning();
  return result;
}

export async function listFeeds() {
  return await db.select().from(feeds);
}

export async function getFeedByURL(url: string) {
  const result = await db.select().from(feeds).where(eq(feeds.url, url));
  return firstOrUndefined(result);
}

export async function markFeedFetched(id: string) {
  await db.update(feeds).set({ last_fetched_at: sql`NOW()` }).where(eq(feeds.id, id));
}

export async function getNextFeedToFetch() {
  const result = await db.select().from(feeds).orderBy(sql`${feeds.last_fetched_at} NULLS FIRST`).limit(1);
  return firstOrUndefined(result);
}
