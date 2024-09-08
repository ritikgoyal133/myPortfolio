import express from "express";
import cors from "cors"; // CORS middleware to allow cross-origin requests
import dotenv from "./config/dotenvConfig.js"; // Config to load environment variables
import emailRoutes from "./routes/emailRoutes.js"; // Email route for handling email-related API calls
import loggingMiddleware from "./middleware/loggingMiddleware.js"; // Custom middleware for logging requests
import config from "./config/config.js"; // Import configuration
import path from "path"; // For handling file paths
import rateLimit from "express-rate-limit"; // For rate limiting
import helmet from "helmet"; // For securing HTTP headers
import compression from "compression"; // For response compression
import morgan from "morgan"; // For logging HTTP requests

// Initialize dotenv to load environment variables from a .env file
dotenv();

// Create an Express application
const app = express();

// Middleware setup
app.use(
  cors({
    origin: config.cors.origin, // Enable CORS for specified origins
  })
);
app.use(express.json()); // Parse incoming JSON requests

// Apply custom logging middleware
app.use(loggingMiddleware); // Log requests based on custom logic

// Apply security middleware
app.use(helmet()); // Secures HTTP headers(Adds security headers to protect against common vulnerabilities.)
app.use(compression()); //Compresses responses to reduce payload size.

// Apply the logging middleware for HTTP requests
app.use(morgan(config.logging)); // Logging setup based on environment

// Rate limiter to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Serve static files if configured
// For production purpose
console.log("Serving static files from:", config.staticFiles);
if (config.serveStatic) {
  app.use(express.static(config.staticFiles)); // Serve static files from the specified directory

  // Handle all other routes by serving the index.html file
  app.get("*", (req, res) => {
    const indexPath = path.join(config.staticFiles, "index.html");
    console.log("Serving index.html from:", indexPath);
    res.sendFile(indexPath);
  });
}

// Routes
app.use("/api/v1/portfolio", emailRoutes); // Route for email-related API calls

// Define the port to listen on from the configuration
const PORT = config.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
