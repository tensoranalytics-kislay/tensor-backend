import { Router } from "express";
import contactRoutes from "./contact.routes";

const router = Router();

// Register all routes
router.use("/contacts", contactRoutes);

export default router;
