import { registerCommand, runCommand, CommandsRegistry } from './registry';
import { handlerLogin } from './handler_login';
import { handlerRegister } from './handler_register';
import { handlerReset } from './handler_reset';
import { handlerUsers } from './handler_users';
import { handlerAgg } from './handler_agg';

async function main() {
	const args = process.argv.slice(2);

  	if (args.length < 1) {
    		console.log("usage: cli <command> [args...]");
    		process.exit(1);
  	}

	const cmdName = args[0];
	const cmdArgs = args.slice(1);
	const registry = {} as CommandsRegistry;

	registerCommand(registry, "login", handlerLogin);
	registerCommand(registry, "register", handlerRegister);
	registerCommand(registry, "reset", handlerReset);
	registerCommand(registry, "users", handlerUsers);
	registerCommand(registry, "agg", handlerAgg);

	try {
    		await runCommand(registry, cmdName, ...cmdArgs);
  	} catch (err) {
    		if (err instanceof Error) {
      			console.error(`Error running command ${cmdName}: ${err.message}`);
    		} else {
      			console.error(`Error running command ${cmdName}: ${err}`);
    		}
    		process.exit(1);
  	}
	
	process.exit(0);
}

main();
