import mongoose from "mongoose";
import { config } from "../configs";

export async function connectDatabase(): Promise<void> {
  try {
    let connectionString = config.database.uri;

    // console.log(connectionString);

    // If no URI is provided, build it from individual components
    if (!connectionString) {
      const { username, password, host, port, database } = config.database;
      const auth = username && password ? `${username}:${password}@` : "";
      connectionString = `mongodb://${auth}${host}:${port}/${database}`;
    }

    console.log("🔄 Connecting to MongoDB...");

    // Connect to MongoDB with options from config
    await mongoose.connect(connectionString, config.database.options);

    console.log("🍃 MongoDB connected successfully");

    // Log when connection is disconnected
    mongoose.connection.on("disconnected", () => {
      console.log("❌ MongoDB disconnected");
    });

    // Log connection errors
    mongoose.connection.on("error", (err) => {
      console.error("🚨 MongoDB connection error:", err);
    });

    // Handle application termination
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("👋 MongoDB connection closed due to app termination");
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}
