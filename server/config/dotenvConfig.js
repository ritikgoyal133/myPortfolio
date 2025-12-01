// Import the dotenv library to manage environment variables
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory of this file to locate .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file immediately when this module is imported
// This ensures dotenv is loaded before any other module tries to access process.env
dotenv.config({ path: path.join(__dirname, "../.env") });
