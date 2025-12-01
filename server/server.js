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
import fs from "fs"; // For file system operations

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

// Apply security middleware with CSP configuration
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'", // Needed for React development
          "https://cdn.jsdelivr.net",
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://cdn.jsdelivr.net",
        ],
        connectSrc: [
          "'self'",
          "https://cdn.jsdelivr.net",
        ],
        imgSrc: ["'self'", "data:", "https:"],
        fontSrc: ["'self'", "https://cdn.jsdelivr.net"],
      },
    },
  })
); // Secures HTTP headers(Adds security headers to protect against common vulnerabilities.)
app.use(compression()); //Compresses responses to reduce payload size.

// Apply the logging middleware for HTTP requests
app.use(morgan(config.logging)); // Logging setup based on environment

// Rate limiter to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes - API routes should come before static file serving
app.use("/api/v1/portfolio", emailRoutes); // Route for email-related API calls

// Serve static files if configured
// For production purpose
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("Serving static files from:", config.staticFiles);
console.log("serveStatic:", config.serveStatic);

if (config.serveStatic) {
  // Check if build directory exists
  const staticPath = path.resolve(config.staticFiles);
  if (!fs.existsSync(staticPath)) {
    console.error("ERROR: Build directory not found at:", staticPath);
    console.error("Please run 'npm run build' first to build the React app.");
  } else {
    console.log("Build directory found at:", staticPath);
    
    // List some files to verify build exists
    const staticJsPath = path.join(staticPath, "static", "js");
    if (fs.existsSync(staticJsPath)) {
      const jsFiles = fs.readdirSync(staticJsPath);
      console.log("Found JS files:", jsFiles.slice(0, 3));
    }
    
    // Serve static files from the build directory
    // This must come before the catch-all route
    app.use(express.static(staticPath, {
      maxAge: "1y", // Cache static assets for 1 year
      etag: true,
      setHeaders: (res, filePath) => {
        // Ensure correct MIME types
        if (filePath.endsWith(".js")) {
          res.setHeader("Content-Type", "application/javascript");
        } else if (filePath.endsWith(".css")) {
          res.setHeader("Content-Type", "text/css");
        }
      },
    }));

    // Handle all other routes by serving the index.html file (SPA fallback)
    // This should be last to catch all non-API and non-static routes
    app.get("*", (req, res) => {
      // Don't serve index.html for API routes or static file requests
      if (req.path.startsWith("/api") || req.path.startsWith("/static")) {
        return res.status(404).send("Not found");
      }
      const indexPath = path.join(staticPath, "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send("index.html not found");
      }
    });
  }
}

// Define the port to listen on from the configuration
const PORT = config.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
