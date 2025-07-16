import fs from "fs";
import os from "os";
import path from "path";

type Config = {
  currentUserName?: string;
  dbUrl: string;
}

export function setUser(user: string): void {
  const cfg = readConfig();
  cfg.currentUserName = user;
  writeConfig(cfg);
}

function getConfigFilePath(): string {
  return path.join(os.homedir(), ".gatorconfig.json");
}

function writeConfig(cfg: Config): void {
  fs.writeFileSync(getConfigFilePath(), JSON.stringify({current_user_name: cfg.currentUserName, db_url: cfg.dbUrl}));
}

export function readConfig(): Config {
  return validateConfig(JSON.parse(fs.readFileSync(getConfigFilePath())));
}

function validateConfig(rawConfig: any): Config {
  return {
    dbUrl: rawConfig.db_url,
    currentUserName: rawConfig.current_user_name,
  };
}
