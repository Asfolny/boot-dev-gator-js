import { db } from "..";
import { feeds } from "../schema";
import { eq } from "drizzle-orm";
import { firstOrUndefined } from "./utils";

export async function addFeed(name: string, url: string, user_id: string) {
  const [result] = await db.insert(feeds).values({ name: name, url: url, user_id: user_id });
  return result;
}
