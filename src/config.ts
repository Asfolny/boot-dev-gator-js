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
  const file = getConfigFilePath()
  const data = JSON.stringify({
    current_user_name: cfg.currentUserName,
    db_url: cfg.dbUrl
  }, null, 2);

  fs.writeFileSync(file, data, { encoding: "utf-8" });
}

export function readConfig(): Config {
  const file = getConfigFilePath();
  const data = fs.readFileSync(file);
  const raw = JSON.parse(data);

  return validateConfig(raw);
}

function validateConfig(rawConfig: any): Config {
  if (!rawConfig.db_url || typeof rawConfig.db_url !== "string") {
    throw new Error("db_url is required in config file");
  }

  if (
    !rawConfig.current_user_name ||
    typeof rawConfig.current_user_name !== "string"
  ) {
    throw new Error("current_user_name is required in config file");
  }

  return {
    dbUrl: rawConfig.db_url,
    currentUserName: rawConfig.current_user_name,
  };
}
