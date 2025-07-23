import { CommandHandler } from "./registry.js";
import { setUser } from "./config.js";

export function handlerLogin(cmdName: string, ...args: string[]): void {
	if (args.length < 1) {
		throw new Error(`${cmdName} expects 1 argument, the username`);
	}

	setUser(args[0]);
	console.log(`Logged in ${args[0]}`);
}
