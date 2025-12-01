import nodemailer from "nodemailer";
import logToFile from "../utils/logger.js";

// Create nodemailer transporter using environment variables
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail", // You can change this to other services like 'outlook', 'yahoo', etc.
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or App Password
    },
  });
};

const sendEmailController = async (req, res) => {
  try {
    // Extracting data from the request body (name, email, and message fields)
    const { name, email, msg } = req.body;

    // Log received data for debugging
    logToFile(`Received contact form submission: name="${name}", email="${email}", msg length=${msg?.length || 0}`);

    // Server-side validation - check for empty strings and whitespace
    if (!name || !name.trim() || !email || !email.trim() || !msg || !msg.trim()) {
      logToFile(`Validation failed: Missing required fields`);
      return res.status(400).send({
        success: false,
        message: "Please provide all required fields: name, email, and message",
      });
    }

    // Trim whitespace from inputs
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMsg = msg.trim();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      logToFile(`Validation failed: Invalid email format - ${trimmedEmail}`);
      return res.status(400).send({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Validate field lengths
    if (trimmedName.length < 2) {
      logToFile(`Validation failed: Name too short - ${trimmedName.length} characters`);
      return res.status(400).send({
        success: false,
        message: "Name must be at least 2 characters long",
      });
    }

    if (trimmedMsg.length < 10) {
      logToFile(`Validation failed: Message too short - ${trimmedMsg.length} characters`);
      return res.status(400).send({
        success: false,
        message: "Message must be at least 10 characters long",
      });
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      // Log the request even if email is not configured
      logToFile(
        `Email not configured. Received request: Name: ${trimmedName}, Email: ${trimmedEmail}, Message: ${trimmedMsg.substring(0, 50)}...`
      );
      
      return res.status(500).send({
        success: false,
        message: "Email service is not configured. Please contact the administrator.",
      });
    }

    // Create transporter
    const transporter = createTransporter();

    // Email content - HTML template
    const mailOptions = {
      from: `"${trimmedName}" <${process.env.EMAIL_USER}>`, // Sender name and email
      to: process.env.EMAIL_USER, // Your email where you want to receive messages
      replyTo: trimmedEmail, // Reply-to address set to the sender's email
      subject: `Portfolio Contact Form: Message from ${trimmedName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background-color: #1e1e2c;
                color: #fff;
                padding: 20px;
                text-align: center;
                border-radius: 5px 5px 0 0;
              }
              .content {
                background-color: #f9f9f9;
                padding: 30px;
                border: 1px solid #ddd;
                border-top: none;
                border-radius: 0 0 5px 5px;
              }
              .info-row {
                margin-bottom: 15px;
                padding: 10px;
                background-color: #fff;
                border-left: 4px solid #f29f67;
                padding-left: 15px;
              }
              .label {
                font-weight: bold;
                color: #1e1e2c;
                display: block;
                margin-bottom: 5px;
              }
              .value {
                color: #555;
              }
              .message-box {
                background-color: #fff;
                padding: 15px;
                border-left: 4px solid #f29f67;
                margin-top: 10px;
                white-space: pre-wrap;
              }
              .footer {
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
                text-align: center;
                color: #777;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h2>New Message from Portfolio Contact Form</h2>
            </div>
            <div class="content">
              <div class="info-row">
                <span class="label">Name:</span>
                <span class="value">${trimmedName}</span>
              </div>
              <div class="info-row">
                <span class="label">Email:</span>
                <span class="value"><a href="mailto:${trimmedEmail}">${trimmedEmail}</a></span>
              </div>
              <div class="info-row">
                <span class="label">Message:</span>
                <div class="message-box">${trimmedMsg.replace(/\n/g, "<br>")}</div>
              </div>
              <div class="footer">
                <p>This message was sent from your portfolio contact form.</p>
                <p>You can reply directly to this email to respond to ${trimmedName}.</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
        New Message from Portfolio Contact Form
        
        Name: ${trimmedName}
        Email: ${trimmedEmail}
        
        Message:
        ${trimmedMsg}
        
        ---
        This message was sent from your portfolio contact form.
        You can reply directly to this email to respond to ${trimmedName}.
      `, // Plain text version for email clients that don't support HTML
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Log the successful email send
    logToFile(
      `Email sent successfully: Name: ${trimmedName}, Email: ${trimmedEmail}, Message: ${trimmedMsg.substring(0, 50)}...`
    );

    // Send success response
    res.status(200).send({
      success: true,
      message: "Your message has been sent successfully. I will get back to you soon!",
    });
  } catch (error) {
    // Log the error
    logToFile(
      `Error sending email: ${error.message} - Request: Name: ${req.body?.name}, Email: ${req.body?.email}`
    );

    // Handle specific nodemailer errors
    if (error.code === "EAUTH") {
      return res.status(500).send({
        success: false,
        message: "Email authentication failed. Please check email configuration.",
      });
    }

    if (error.code === "ECONNECTION" || error.code === "ETIMEDOUT") {
      return res.status(500).send({
        success: false,
        message: "Could not connect to email server. Please try again later.",
      });
    }

    // Generic error response (don't expose internal error details)
    res.status(500).send({
      success: false,
      message: "An error occurred while sending your message. Please try again later.",
    });
  }
};

export default sendEmailController;
