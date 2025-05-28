import { Router } from "express";
import { ContactController } from "../controllers/contact.controller";

const router = Router();
const contactController = new ContactController();

// POST: Create a new contact form submission
router.post("/", contactController.create);

export default router;
