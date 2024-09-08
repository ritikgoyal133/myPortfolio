import logToFile from "../utils/logger.js";
// import nodemailer from "nodemailer";

// Create a transport object using SMTP configuration
// const transporter = nodemailer.createTransport({
//   service: "gmail", // Use your email service provider
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const sendEmailController = async (req, res) => {
//   try {
//     const { name, email, msg } = req.body;

//     // Validation
//     if (!name || !email || !msg) {
//       return res.status(400).send({
//         success: false,
//         message: "Please provide all fields",
//       });
//     }

//     // Send email
//     await transporter.sendMail({
//       to: process.env.EMAIL_USER, // Your email address where you want to receive messages
//       from: email, // The email address provided by the user
//       subject: "Message from Your Portfolio App",
//       html: `
//         <h5>Detail Information</h5>
//         <ul>
//           <li><p>Name: ${name}</p></li>
//           <li><p>Email: ${email}</p></li>
//           <li><p>Message: ${msg}</p></li>
//         </ul>
//       `,
//     });

//     return res.status(200).send({
//       success: true,
//       message: "Your message was sent successfully",
//     });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return res.status(500).send({
//       success: false,
//       message: "Error sending email",
//       error,
//     });
//   }
// };

const sendEmailController = async (req, res) => {
  try {
    const { name, email, msg } = req.body;

    // Log request data to a file
    logToFile(
      `Received request: Name: ${name}, Email: ${email}, Message: ${msg}`
    );

    // Send a success response
    res.status(200).send({
      success: true,
      message:
        "Your message was received successfully. We will get back to you soon.",
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send({
      success: false,
      message: "Error processing your request",
      error,
    });
  }
};

export default sendEmailController;

// How Nodemailer Works
// Configuration
// Transporter: Nodemailer requires a transporter object to send emails. This object contains the SMTP (Simple Mail Transfer Protocol) server details and authentication credentials.
// For Gmail, the transporter is set up with the SMTP server address and your Gmail account credentials (either your email address and password or an application-specific password).
// Sending Emails:

// Compose Email: You create an email object specifying the sender (from), recipient (to), subject, and body of the email. You can also include HTML content or plain text.
// Send Email: Call the sendMail() method on the transporter object, passing the email object as a parameter. Nodemailer then sends the email through the configured SMTP server.
