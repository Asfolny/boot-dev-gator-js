import { setUser, readConfig } from './config.js';

function main() {
  let cfg = readConfig();
  setUser(cfg, "lane");
  cfg = readConfig();
  console.log(cfg);
}

main();
