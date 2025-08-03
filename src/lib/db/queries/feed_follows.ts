import { eq, and } from "drizzle-orm";
import { db } from "..";
import { feeds, feedFollows, users } from "../schema";

export async function createFeedFollow(user_id: string, feed_id: string) {
  const [newFeedFollow] = await db
    .insert(feedFollows)
    .values({ feed_id, user_id })
    .returning();

  const [result] = await db
    .select({
      id: feedFollows.id,
      createdAt: feedFollows.createdAt,
      updatedAT: feedFollows.updatedAt,
      user_id: feedFollows.user_id,
      feed_id: feedFollows.feed_id,
      feed_name: feeds.name,
      user_name: users.name,
    })
    .from(feedFollows)
    .innerJoin(feeds, eq(feedFollows.feed_id, feeds.id))
    .innerJoin(users, eq(feedFollows.user_id, users.id))
    .where(
      and(
        eq(feedFollows.id, newFeedFollow.id),
        eq(users.id, newFeedFollow.user_id),
      ),
    );

  return result;
}

export async function getFeedFollowsForUser(user_id: string) {
  const result = await db
    .select({
      id: feedFollows.id,
      createdAt: feedFollows.createdAt,
      updatedAT: feedFollows.updatedAt,
      user_id: feedFollows.user_id,
      feed_id: feedFollows.feed_id,
      feedname: feeds.name,
    })
    .from(feedFollows)
    .innerJoin(feeds, eq(feedFollows.feed_id, feeds.id))
    .where(eq(feedFollows.user_id, user_id));

  return result;
}

export async function deleteFeedFollows(user_id: string, feed_id) {
  await db.delete(feedFollows).where(
    and(
        eq(feedFollows.user_id, user_id),
        eq(feedFollows.feed_id, feed_id),
    )
  );
}
