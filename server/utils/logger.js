import { fileURLToPath } from "url"; // Provides the current file's URL
import { dirname, join } from "path"; // Used for working with file paths
import fs from "fs"; // File system module for reading/writing files

// Create __dirname equivalent
// import.meta.url provides the URL of the current module.
// fileURLToPath(import.meta.url) converts the URL to a file path.
// dirname(__filename) gives you the directory name of the current module.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the directory where logs will be stored
const logDirectory = join(__dirname, "../logs");

// Ensure the log directory exists; create it if it doesn't
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

// Generates the file path for today's log file based on the current date.
// The log file will be named YYYY-MM-DD.log and stored in the logs directory.
const getLogFilePath = () => {
  const date = new Date().toISOString().split("T")[0];
  return join(logDirectory, `${date}.log`);
};

//Logs a message to the log file.
//The log entry includes the timestamp of the message and appends it to today's log file.
const logToFile = (message) => {
  const logFilePath = getLogFilePath();
  const logMessage = `${new Date().toISOString()}: ${message}\n`;

  // Append the log message to the file; if the file doesn't exist, it will be created
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) console.error("Failed to write log:", err);
  });
};

export default logToFile;

// Note
// __dirname Equivalent
// In Node.js ES modules, __dirname and __filename are not available by default. The workaround is to use fileURLToPath(import.meta.url) to get the file path and dirname(__filename) to get the directory name.
// path.join([...paths]): Concatenates path segments and normalizes the resulting path.
