import path from "path";
import { fileURLToPath } from "url";

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  PORT: process.env.PORT || 8080,
  serveStatic: process.env.NODE_ENV === "production",
  staticFiles: path.join(__dirname, "../client/build"),
  cors: {
    origin: process.env.CORS_ORIGIN || "*", // Default to '*' if not set
  },
  logging: process.env.NODE_ENV === "production" ? "combined" : "dev",
};

export default config;
