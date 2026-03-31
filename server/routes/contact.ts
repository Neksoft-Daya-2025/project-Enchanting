/**
 * Contact Form Handler
 * Handles contact form submissions
 */

import { RequestHandler } from "express";
import { sendEmail, formatEmailBody } from "../utils/email-sender";
import { getEmailConfig } from "../utils/email-config";
import { appendFileSync } from "fs";
import { join } from "path";

const LOG_FILE = join(process.cwd(), "form_submissions.log");

export const handleContact: RequestHandler = async (req, res) => {
  try {
    const { name, email, company, phone, subject, message, enquiryType } =
      req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, email, and message are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    // Get email configuration
    const config = getEmailConfig();
    const to = config.to_email;
    const emailSubject = `New Contact Form Submission - ${
      subject || "General Inquiry"
    }`;

    // Prepare admin email content
    const adminContent = `
        <h2>New Contact Form Submission</h2>
        <div class="info-row">
            <span class="info-label">Name:</span> ${escapeHtml(name)}
        </div>
        <div class="info-row">
            <span class="info-label">Email:</span> ${escapeHtml(email)}
        </div>
        <div class="info-row">
            <span class="info-label">Company:</span> ${
              company ? escapeHtml(company) : "Not provided"
            }
        </div>
        <div class="info-row">
            <span class="info-label">Phone:</span> ${
              phone ? escapeHtml(phone) : "Not provided"
            }
        </div>
        <div class="info-row">
            <span class="info-label">Subject:</span> ${
              subject ? escapeHtml(subject) : "General Inquiry"
            }
        </div>
        <div class="info-row">
            <span class="info-label">Enquiry Type:</span> ${
              enquiryType ? escapeHtml(enquiryType) : "Not specified"
            }
        </div>
        <div class="info-row">
            <span class="info-label">Message:</span><br>
            ${escapeHtml(message).replace(/\n/g, "<br>")}
        </div>
        <div class="info-row">
            <span class="info-label">Submitted:</span> ${new Date().toLocaleString()}
        </div>
    `;

    const adminBody = formatEmailBody(adminContent, "Contact Form Submission");

    // Send admin email
    const adminResult = await sendEmail(
      to,
      emailSubject,
      adminBody,
      email,
      name
    );

    // Prepare client confirmation email
    const clientSubject = "Thank you for contacting Enchanting India Tours!";
    const clientContent = `
        <h2>Thank you for your inquiry!</h2>
        <p>Dear ${escapeHtml(name)},</p>
        <p>Thank you for reaching out to Enchanting India Tours. We have received your message and will get back to you within 24 hours.</p>
        
        <h3 style="color: #1e40af; margin-top: 20px;">Your Inquiry Details</h3>
        <div class="info-row">
            <span class="info-label">Subject:</span> ${
              subject ? escapeHtml(subject) : "General Inquiry"
            }
        </div>
        <div class="info-row">
            <span class="info-label">Message:</span><br>
            ${escapeHtml(message).replace(/\n/g, "<br>")}
        </div>
        <div class="info-row">
            <span class="info-label">Submitted:</span> ${new Date().toLocaleString()}
        </div>
        
        <h3 style="color: #1e40af; margin-top: 20px;">What happens next?</h3>
        <ul>
            <li>Our team will review your inquiry</li>
            <li>We will contact you within 24 hours</li>
            <li>We will provide detailed information about our tours</li>
            <li>We will help you plan your perfect travel experience</li>
        </ul>
        
        <p style="margin-top: 20px;">If you have any urgent questions, please contact us at info@enchantingindiatours.com.</p>
        
        <p>With warm regards,<br>
        <strong>The Enchanting India Tours Team</strong></p>
    `;

    const clientBody = formatEmailBody(clientContent, "Thank you for your inquiry");
    const clientResult = await sendEmail(email, clientSubject, clientBody);

    if (adminResult.success && clientResult.success) {
      // Log submission
      logFormSubmission("contact", req.body, req.ip || "unknown");

      return res.json({
        success: true,
        message:
          "Contact form submitted successfully. Check your email for confirmation.",
      });
    } else {
      return res.status(500).json({
        success: false,
        message:
          "Form submitted but email delivery failed. Please try again or contact us directly.",
      });
    }
  } catch (error: any) {
    console.error("Contact form error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
};

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Log form submission
 */
function logFormSubmission(
  formType: string,
  data: any,
  ip: string
): void {
  const logEntry = {
    timestamp: new Date().toISOString(),
    form_type: formType,
    data: data,
    ip: ip,
    user_agent: "unknown", // Could extract from req.headers['user-agent']
  };

  try {
    appendFileSync(
      LOG_FILE,
      JSON.stringify(logEntry) + "\n",
      "utf-8"
    );
  } catch (error) {
    console.error("Error logging form submission:", error);
  }
}

