import { fetchFeed } from "./feed";

export async function handlerAgg(cmdName: string, ...args: string[]): Promise<void> {
	const feed = await fetchFeed("https://www.wagslane.dev/index.xml");
	console.log(feed.channel);
}
