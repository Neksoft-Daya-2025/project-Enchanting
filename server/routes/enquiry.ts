/**
 * Enquiry Form Handler
 * Handles enquiry/partnership form submissions
 */

import { RequestHandler } from "express";
import { sendEmail, formatEmailBody } from "../utils/email-sender";
import { getEmailConfig } from "../utils/email-config";
import { appendFileSync } from "fs";
import { join } from "path";

const LOG_FILE = join(process.cwd(), "form_submissions.log");

export const handleEnquiry: RequestHandler = async (req, res) => {
  try {
    const {
      companyName,
      contactPerson,
      email,
      phone,
      website,
      country,
      destinations,
      travelDates,
      groupSize,
      duration,
      budget,
      services,
      specialRequirements,
      partnershipType,
      targetMarket,
      monthlyVolume,
      additionalInfo,
      howDidYouHear,
    } = req.body;

    // Validate required fields
    if (!companyName || !contactPerson || !email || !phone) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: company name, contact person, email, and phone are required",
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
    const emailSubject = "🎫 New Partnership Enquiry - Enchanting India Tours";

    // Prepare admin email content
    const adminContent = `
        <h2>New Partnership Enquiry</h2>
        <p><strong>A company has submitted a partnership enquiry!</strong></p>
        
        <h3 style="color: #1e40af; margin-top: 20px;">Company Information</h3>
        <div class="info-row">
            <span class="info-label">Company Name:</span> ${escapeHtml(companyName)}
        </div>
        <div class="info-row">
            <span class="info-label">Contact Person:</span> ${escapeHtml(contactPerson)}
        </div>
        <div class="info-row">
            <span class="info-label">Email:</span> ${escapeHtml(email)}
        </div>
        <div class="info-row">
            <span class="info-label">Phone:</span> ${escapeHtml(phone)}
        </div>
        <div class="info-row">
            <span class="info-label">Website:</span> ${
              website ? escapeHtml(website) : "Not provided"
            }
        </div>
        <div class="info-row">
            <span class="info-label">Country:</span> ${
              country ? escapeHtml(country) : "Not provided"
            }
        </div>
        
        <h3 style="color: #1e40af; margin-top: 20px;">Travel Requirements</h3>
        <div class="info-row">
            <span class="info-label">Destinations:</span> ${
              destinations && destinations.length > 0
                ? escapeHtml(destinations.join(", "))
                : "Not specified"
            }
        </div>
        <div class="info-row">
            <span class="info-label">Travel Dates:</span> ${
              travelDates ? escapeHtml(travelDates) : "Not specified"
            }
        </div>
        <div class="info-row">
            <span class="info-label">Group Size:</span> ${
              groupSize ? escapeHtml(groupSize) : "Not specified"
            }
        </div>
        <div class="info-row">
            <span class="info-label">Duration:</span> ${
              duration ? escapeHtml(duration) : "Not specified"
            }
        </div>
        <div class="info-row">
            <span class="info-label">Budget:</span> ${
              budget ? escapeHtml(budget) : "Not specified"
            }
        </div>
        
        <h3 style="color: #1e40af; margin-top: 20px;">Service Requirements</h3>
        <div class="info-row">
            <span class="info-label">Services:</span> ${
              services && services.length > 0
                ? escapeHtml(services.join(", "))
                : "Not specified"
            }
        </div>
        <div class="info-row">
            <span class="info-label">Special Requirements:</span><br>
            ${
              specialRequirements
                ? escapeHtml(specialRequirements).replace(/\n/g, "<br>")
                : "None"
            }
        </div>
        
        <h3 style="color: #1e40af; margin-top: 20px;">Partnership Details</h3>
        <div class="info-row">
            <span class="info-label">Partnership Type:</span> ${
              partnershipType ? escapeHtml(partnershipType) : "Not specified"
            }
        </div>
        <div class="info-row">
            <span class="info-label">Target Market:</span> ${
              targetMarket ? escapeHtml(targetMarket) : "Not specified"
            }
        </div>
        <div class="info-row">
            <span class="info-label">Monthly Volume:</span> ${
              monthlyVolume ? escapeHtml(monthlyVolume) : "Not specified"
            }
        </div>
        
        <h3 style="color: #1e40af; margin-top: 20px;">Additional Information</h3>
        <div class="info-row">
            <span class="info-label">Additional Info:</span><br>
            ${
              additionalInfo
                ? escapeHtml(additionalInfo).replace(/\n/g, "<br>")
                : "None"
            }
        </div>
        <div class="info-row">
            <span class="info-label">How did you hear about us:</span> ${
              howDidYouHear ? escapeHtml(howDidYouHear) : "Not specified"
            }
        </div>
        <div class="info-row">
            <span class="info-label">Submitted:</span> ${new Date().toLocaleString()}
        </div>
    `;

    const adminBody = formatEmailBody(adminContent, "Partnership Enquiry");

    // Send admin email
    const adminResult = await sendEmail(
      to,
      emailSubject,
      adminBody,
      email,
      contactPerson
    );

    // Prepare client confirmation email
    const clientSubject =
      "Thank you for your Partnership Enquiry - Enchanting India Tours";
    const clientContent = `
        <h2>Thank you for your partnership enquiry!</h2>
        <p>Dear ${escapeHtml(contactPerson)},</p>
        <p>Thank you for your interest in partnering with Enchanting India Tours. We have received your enquiry and will review it shortly.</p>
        
        <h3 style="color: #1e40af; margin-top: 20px;">Your Enquiry Details</h3>
        <div class="info-row">
            <span class="info-label">Company:</span> ${escapeHtml(companyName)}
        </div>
        <div class="info-row">
            <span class="info-label">Partnership Type:</span> ${
              partnershipType ? escapeHtml(partnershipType) : "Not specified"
            }
        </div>
        <div class="info-row">
            <span class="info-label">Destinations:</span> ${
              destinations && destinations.length > 0
                ? escapeHtml(destinations.join(", "))
                : "Not specified"
            }
        </div>
        <div class="info-row">
            <span class="info-label">Submitted:</span> ${new Date().toLocaleString()}
        </div>
        
        <h3 style="color: #1e40af; margin-top: 20px;">What happens next?</h3>
        <ul>
            <li>Our partnership team will review your enquiry</li>
            <li>We will contact you within 24-48 hours</li>
            <li>We will discuss partnership opportunities</li>
            <li>We will provide detailed information about our services</li>
            <li>We will guide you through the partnership process</li>
        </ul>
        
        <p style="margin-top: 20px;">If you have any questions about your enquiry, please contact us at info@enchantingindiatours.com.</p>
        
        <p>We look forward to working with you!<br>
        <strong>The Enchanting India Tours Team</strong></p>
    `;

    const clientBody = formatEmailBody(
      clientContent,
      "Partnership Enquiry Confirmation"
    );
    const clientResult = await sendEmail(email, clientSubject, clientBody);

    if (adminResult.success && clientResult.success) {
      // Log submission
      logFormSubmission("enquiry", req.body, req.ip || "unknown");

      return res.json({
        success: true,
        message:
          "Enquiry submitted successfully. Check your email for confirmation.",
      });
    } else {
      return res.status(500).json({
        success: false,
        message:
          "Form submitted but email delivery failed. Please try again or contact us directly.",
      });
    }
  } catch (error: any) {
    console.error("Enquiry form error:", error);
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
    user_agent: "unknown",
  };

  try {
    appendFileSync(LOG_FILE, JSON.stringify(logEntry) + "\n", "utf-8");
  } catch (error) {
    console.error("Error logging form submission:", error);
  }
}

