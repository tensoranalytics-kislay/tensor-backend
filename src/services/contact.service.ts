import Contact, { IContact } from "../models/contact.model";

export interface CreateContactDto {
  name: string;
  email: string;
  company?: string;
  contactNumber: string;
  message?: string;
}

export class ValidationError extends Error {
  errors: Record<string, string>;

  constructor(errors: Record<string, string>) {
    super("Validation Error");
    this.name = "ValidationError";
    this.errors = errors;
  }
}

export class ContactService {
  /**
   * Validate contact form data
   */
  private validateContactData(data: CreateContactDto): void {
    const errors: Record<string, string> = {};

    console.log("Hi from contact service");

    // Check required fields
    if (!data.name) {
      errors.name = "Name is required";
    } else if (data.name.length > 100) {
      errors.name = "Name cannot exceed 100 characters";
    }

    if (!data.email) {
      errors.email = "Email is required";
    } else if (!this.isValidEmail(data.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!data.contactNumber) {
      errors.contactNumber = "Contact number is required";
    } else if (!this.isValidPhoneNumber(data.contactNumber)) {
      errors.contactNumber = "Please enter a valid contact number";
    }

    // Company is optional, but validate if provided
    if (data.company && data.company.length > 100) {
      errors.company = "Company name cannot exceed 100 characters";
    }

    // Message is optional, but validate if provided
    if (data.message && data.message.length > 1000) {
      errors.message = "Message cannot exceed 1000 characters";
    }

    // If there are any errors, throw a validation error
    if (Object.keys(errors).length > 0) {
      throw new ValidationError(errors);
    }
  }

  /**
   * Sanitize contact form data
   */
  private sanitizeContactData(data: CreateContactDto): CreateContactDto {
    const sanitized = { ...data };

    // Trim all string fields and sanitize against XSS
    if (sanitized.name) {
      sanitized.name = this.sanitizeString(sanitized.name.trim());
    }

    if (sanitized.email) {
      sanitized.email = sanitized.email.trim().toLowerCase();
    }

    if (sanitized.company) {
      sanitized.company = this.sanitizeString(sanitized.company.trim());
    }

    if (sanitized.contactNumber) {
      // Keep only numbers, spaces, and certain special characters
      sanitized.contactNumber = sanitized.contactNumber
        .trim()
        .replace(/[^\d\s\+\-\(\)\.]/g, "");
    }

    if (sanitized.message) {
      sanitized.message = this.sanitizeString(sanitized.message.trim());
    }

    return sanitized;
  }

  /**
   * Sanitize a string against XSS
   */
  private sanitizeString(str: string): string {
    return str
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  /**
   * Validate phone number format (allows various formats)
   */
  private isValidPhoneNumber(phone: string): boolean {
    const phoneRegex =
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone);
  }

  /**
   * Create a new contact form submission
   */
  async create(contactData: CreateContactDto): Promise<IContact> {
    try {
      // Validate input data
      this.validateContactData(contactData);

      // Sanitize input data
      const sanitizedData = this.sanitizeContactData(contactData);

      // Create and save the contact
      const contact = new Contact(sanitizedData);
      return await contact.save();
    } catch (error) {
      // Re-throw the error to be handled by the controller
      throw error;
    }
  }
}
