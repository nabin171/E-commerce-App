import express from "express";
import { submitContactForm } from "../controllers/contactController.js";

const contactRouter = express.Router();

// POST /api/contact
contactRouter.post("/", submitContactForm);

export default contactRouter; // ✅ use 'router' instead of 'contactRouter'
