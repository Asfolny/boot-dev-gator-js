import { setUser, readConfig } from './config.js';

function main() {
  setUser("lane");
  const cfg = readConfig();
  console.log(cfg);
}

main();
