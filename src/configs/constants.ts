export const DATABASE_TYPES = {
  POSTGRES: "postgres",
  MYSQL: "mysql",
  MONGODB: "mongodb",
} as const;

export const ENVIRONMENTS = {
  DEVELOPMENT: "development",
  PRODUCTION: "production",
  TEST: "test",
} as const;

export const LOG_LEVELS = {
  ERROR: "error",
  WARN: "warn",
  INFO: "info",
  DEBUG: "debug",
} as const;

export const LOG_FORMATS = {
  JSON: "json",
  SIMPLE: "simple",
  DETAILED: "detailed",
} as const;

export type DatabaseType = (typeof DATABASE_TYPES)[keyof typeof DATABASE_TYPES];
export type Environment = (typeof ENVIRONMENTS)[keyof typeof ENVIRONMENTS];
export type LogLevel = (typeof LOG_LEVELS)[keyof typeof LOG_LEVELS];
export type LogFormat = (typeof LOG_FORMATS)[keyof typeof LOG_FORMATS];
