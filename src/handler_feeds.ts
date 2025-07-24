import { getUserById } from "./lib/db/queries/users";
import { listFeeds } from "./lib/db/queries/feeds";
import { User, Feed } from "./lib/db/schema";

export async function handlerFeeds(cmdName: string, ...args: string[]): Promise<void> {
	const feeds: Feed[] | undefined = await listFeeds();
	if (!feeds || feeds.length < 1) {
		throw new Error('No feeds at all were found');
	}

	for (const feed of feeds) {
		const user = await getUserById(feed.user_id);
		if (!user) {
			// If you're here, you've at some point turned off foreign key checks and fucked up
			throw new Error('Feed is created by user who does not exist!');
		}

		console.log(`* ${feed.name} (${feed.url}) by ${user.name}`);
	}
}
