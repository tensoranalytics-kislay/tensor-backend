import { DATABASE_TYPES, DatabaseType } from "./constants";
import { ConnectOptions } from "mongoose";

export interface DatabaseConfig {
  type: DatabaseType;
  uri?: string;
  host: string;
  port: number;
  database: string;
  username?: string;
  password?: string;
  options: ConnectOptions;
}

export const getDatabaseConfig = (): DatabaseConfig => {
  return {
    type: DATABASE_TYPES.MONGODB,
    uri: process.env.MONGODB_URI,
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "27017", 10),
    database: process.env.DB_NAME || "playful_db",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    options: {
      retryWrites: true,
      w: "majority" as const,
    },
  };
};
