import express, { Express, Request, Response } from "express";
import cors from "cors";
import { config } from "./configs";
import { connectDatabase } from "./utils/database";
import routes from "./routes";

// Initialize express app
const app: Express = express();

// Connect to MongoDB
connectDatabase();

// Middleware
// console.log(config.cors);
app.use(cors(config.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use(config.app.server.apiPrefix, routes);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Welcome to the Playful Backend API",
    environment: config.app.env,
    version: "1.0.0",
  });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Start server
app.listen(config.app.server.port, () => {
  console.log(`
🚀 Server is running in ${config.app.env} mode
📡 Server URL: http://${config.app.server.host}:${config.app.server.port}
🔌 API Endpoint: http://${config.app.server.host}:${config.app.server.port}${config.app.server.apiPrefix}
📝 Logging level: ${config.logger.level}
🍃 Database: ${config.database.type}
  `);
});
