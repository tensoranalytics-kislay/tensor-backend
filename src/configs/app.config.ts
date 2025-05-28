import { ENVIRONMENTS, Environment } from "./constants";

export interface AppConfig {
  env: Environment;
  isProduction: boolean;
  server: {
    port: number;
    host: string;
    apiPrefix: string;
  };
  rateLimiting: {
    windowMs: number;
    maxRequests: number;
  };
}

export const getAppConfig = (): AppConfig => {
  const env = (process.env.NODE_ENV as Environment) || ENVIRONMENTS.DEVELOPMENT;

  return {
    env,
    isProduction: env === ENVIRONMENTS.PRODUCTION,
    server: {
      port: parseInt(process.env.PORT || "3000", 10),
      host: process.env.HOST || "localhost",
      apiPrefix: process.env.API_PREFIX || "/api/v1",
    },
    rateLimiting: {
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000", 10), // 15 minutes
      maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100", 10),
    },
  };
};
