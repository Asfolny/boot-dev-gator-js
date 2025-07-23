import { resetUsers } from "./lib/db/queries/reset";

export async function handlerReset(cmdName: string, ...args: string[]): Promise<void> {
	await resetUsers();
}
