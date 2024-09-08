import express from "express";
import sendEmailController from "../controllers/emailController.js";

// Create a router instance from Express
const router = express.Router();

router.post("/sendEmail", sendEmailController);

export default router;
