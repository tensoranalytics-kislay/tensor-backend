import { Request, Response } from "express";
import {
  ContactService,
  CreateContactDto,
  ValidationError,
} from "../services/contact.service";

export class ContactController {
  private contactService: ContactService;

  constructor() {
    this.contactService = new ContactService();
  }

  /**
   * Create a new contact submission
   */
  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const contactData: CreateContactDto = req.body;
      const contact = await this.contactService.create(contactData);

      res.status(201).json({
        success: true,
        message: "Contact form submitted successfully",
        data: contact,
      });
    } catch (error: any) {
      if (error instanceof ValidationError) {
        res.status(400).json({
          success: false,
          message: "Validation Error",
          errors: error.errors,
        });
      } else if (error.name === "ValidationError") {
        // Mongoose validation errors
        const errors = Object.values(error.errors).map(
          (err: any) => err.message
        );
        res.status(400).json({
          success: false,
          message: "Validation Error",
          errors,
        });
      } else {
        console.error("Contact form submission error:", error);
        res.status(500).json({
          success: false,
          message: "Failed to submit contact form",
          error:
            process.env.NODE_ENV === "production"
              ? "Internal server error"
              : error.message,
        });
      }
    }
  };
}
