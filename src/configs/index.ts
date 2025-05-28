import dotenv from "dotenv";
import { AppConfig, getAppConfig } from "./app.config";
import { CorsConfig, getCorsConfig } from "./cors.config";
import { DatabaseConfig, getDatabaseConfig } from "./database.config";
import { LoggerConfig, getLoggerConfig } from "./logger.config";

// Load environment variables from .env file
dotenv.config();

export interface Config {
  app: AppConfig;
  cors: CorsConfig;
  database: DatabaseConfig;
  logger: LoggerConfig;
}

export const config: Config = {
  app: getAppConfig(),
  cors: getCorsConfig(),
  database: getDatabaseConfig(),
  logger: getLoggerConfig(),
};

// Re-export individual configs and their types
export * from "./app.config";
export * from "./cors.config";
export * from "./database.config";
export * from "./logger.config";
export * from "./constants";
