import logToFile from "../utils/logger.js";

const sendEmailController = async (req, res) => {
  try {
    // Extracting data from the request body (name, email, and message fields)
    const { name, email, msg } = req.body;

    // Attempt to log the request details to a log file
    try {
      logToFile(
        `Received request: Name: ${name}, Email: ${email}, Message: ${msg}`
      );
    } catch (logError) {
      // If logging fails, return a 500 error response
      return res.status(500).send({
        success: false,
        message: "Error processing your request",
        error: logError.message,
      });
    }

    // Send a success response
    res.status(200).send({
      success: true,
      message:
        "Your message received successfully. We will get back to you soon.",
    });
  } catch (error) {
    // Respond with a 500 error if there's an issue during request handling
    res.status(500).send({
      success: false,
      message: "Error processing your request",
      error: error.message,
    });
  }
};

export default sendEmailController;
