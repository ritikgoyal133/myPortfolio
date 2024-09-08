// Import the dotenv library to manage environment variables
import dotenv from "dotenv";

const dotenvConfig = () => {
  // Load environment variables from the .env file into process.env
  dotenv.config();
};

export default dotenvConfig;
