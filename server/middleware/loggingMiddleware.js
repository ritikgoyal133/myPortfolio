import logMessage from "../utils/logger.js";

const loggingMiddleware = (req, res, next) => {
  // Log the incoming HTTP request method (GET, POST, etc.) and the requested URL
  logMessage(`Request: ${req.method} ${req.url}`);

  // Attach an event listener to log the response status code and message
  res.on("finish", () => {
    logMessage(`Response: ${res.statusCode} ${res.statusMessage}`);
  });

  // Proceed to the next middleware or route handler
  next();
};

export default loggingMiddleware;
