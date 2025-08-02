import { readConfig } from "./config";
import { getUser } from "./lib/db/queries/users";
import { User } from "./lib/db/schema";

export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;

export type CommandsRegistry = Record<string, CommandHandler>;

export type UserCommandHandler = (
	cmdName: string,
	user: User,
	...args: string[]
) => Promise<void>;

export function middlewareLoggedIn(handler: UserCommandHandler): CommandHandler {
	return async function(cmdName: string, ...args: string[]) {
		const config = readConfig();
		const userName = config.currentUserName;
		if (userName === undefined) {
			throw new Error("No user logged in");
		}

		const user = await getUser(userName);
		if (!user) {
			throw new Error("No user logged in");
		}

		return await handler(cmdName, user, ...args);
	}
}

export function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler): void {
	registry[cmdName] = handler;
}

export async function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]): Promise<void> {
	const handler = registry[cmdName];
	if (handler === undefined) {
		throw new Error(`${cmdName}: no such command.`);
	}

	await handler(cmdName, ...args);
}
