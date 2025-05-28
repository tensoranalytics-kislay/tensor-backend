export interface CorsConfig {
  origin: string | string[] | boolean;
  credentials: boolean;
  methods?: string[];
  allowedHeaders?: string[];
}

export const getCorsConfig = (): CorsConfig => {
  // Get the frontend URL from environment variables
  const frontendUrl =
    process.env.FRONTEND_URL ||
    process.env.CORS_ORIGIN ||
    "http://localhost:8080/";

  // If multiple URLs are provided, split them and normalize them
  const origins = frontendUrl.includes(",")
    ? frontendUrl.split(",").map((url) => url.trim().replace(/\/$/, ""))
    : frontendUrl.replace(/\/$/, "");

  // Log CORS configuration in development
  if (process.env.NODE_ENV !== "production") {
    console.log("🔒 CORS Configuration:");
    console.log("   Allowed Origins:", origins);
  }

  return {
    origin: "http://localhost:8080", // Allow all origins in development
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  };
};
