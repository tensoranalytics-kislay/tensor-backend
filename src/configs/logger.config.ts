export interface LoggerConfig {
  level: string;
  format: string;
  directory: string;
  maxFiles: number;
  maxSize: string;
}

export const getLoggerConfig = (): LoggerConfig => {
  return {
    level: process.env.LOG_LEVEL || "info",
    format: process.env.LOG_FORMAT || "json",
    directory: process.env.LOG_DIRECTORY || "logs",
    maxFiles: parseInt(process.env.LOG_MAX_FILES || "5", 10),
    maxSize: process.env.LOG_MAX_SIZE || "10m",
  };
};
