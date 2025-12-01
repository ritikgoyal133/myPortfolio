import path from "path";
import { fileURLToPath } from "url";

// Get the directory of this config file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Note: dotenv is loaded in server.js via dotenvConfig.js import
// Environment variables are already available in process.env

const config = {
  PORT: process.env.PORT || 8080,
  serveStatic: process.env.NODE_ENV === "production",
  staticFiles: path.join(__dirname, "../build"),
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
  },
  logging: process.env.NODE_ENV === "production" ? "combined" : "dev",
};

export default config;