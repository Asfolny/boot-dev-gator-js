export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;

export type CommandsRegistry = Record<string, CommandHandler>;

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
