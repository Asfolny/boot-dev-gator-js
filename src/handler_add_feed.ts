import { addFeed } from "./lib/db/queries/feeds";
import { Feed, User } from "src/lib/db/schema";
import { createFeedFollow } from "./lib/db/queries/feed_follows";
import { printFeedFollow } from "./handler_follow";

export async function handlerAddFeed(cmdName: string, user: User, ...args: string[]): Promise<void> {
	if (args.length < 2) {
		throw new Error(`${cmdName} requires 2 arguments, the name and the feed url`);
	}

	const feed = await addFeed(args[0], args[1], user.id);
	if (!feed) {
		console.log(feed);
		throw new Error(`Failed to create feed`);
	}

	const feedFollow = await createFeedFollow(user.id, feed.id);
	printFeedFollow(user.name, feedFollow.feed_name);

	console.log("Feed created successfully:");
	printFeed(feed, user);
}

function printFeed(feed: Feed, user: User) {
	console.log(`* ID:            ${feed.id}`);
	console.log(`* Created:       ${feed.createdAt}`);
	console.log(`* Updated:       ${feed.updatedAt}`);
	console.log(`* name:          ${feed.name}`);
	console.log(`* URL:           ${feed.url}`);
	console.log(`* User:          ${user.name}`);
}

