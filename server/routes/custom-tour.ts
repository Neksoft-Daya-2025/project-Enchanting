/**
 * Custom Tour Form Handler
 * Handles custom tour requests from individual travelers
 */

import { RequestHandler } from "express";
import { sendEmail, formatEmailBody } from "../utils/email-sender";
import { getEmailConfig } from "../utils/email-config";
import { appendFileSync } from "fs";
import { join } from "path";

const LOG_FILE = join(process.cwd(), "form_submissions.log");

export const handleCustomTour: RequestHandler = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      country,
      destinations,
      travelDates,
      numberOfTravelers,
      tripDuration,
      budget,
      interests,
      specialRequirements,
      howDidYouHear,
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, email, and phone are required",
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

    // Validate at least one destination
    if (!destinations || !Array.isArray(destinations) || destinations.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select at least one destination",
      });
    }

    const config = getEmailConfig();
    const to = config.to_email;
    const emailSubject = "New Custom Tour Request - Enchanting India Tours";

    const countryLabels: Record<string, string> = {
      usa: "United States",
      uk: "United Kingdom",
      canada: "Canada",
      australia: "Australia",
      germany: "Germany",
      france: "France",
      spain: "Spain",
      italy: "Italy",
      india: "India",
      other: "Other",
    };

    const destinationLabels: Record<string, string> = {
      india: "India",
      "sri-lanka": "Sri Lanka",
      nepal: "Nepal",
      bhutan: "Bhutan",
    };

    const budgetLabels: Record<string, string> = {
      "under-1000": "Under $1,000",
      "1000-2000": "$1,000 - $2,000",
      "2000-5000": "$2,000 - $5,000",
      "5000-10000": "$5,000 - $10,000",
      "10000+": "$10,000+",
    };

    const howDidYouHearLabels: Record<string, string> = {
      search: "Search Engine",
      social: "Social Media",
      referral: "Referral",
      friend: "Friend or Family",
      "travel-blog": "Travel Blog",
      other: "Other",
    };

    const destinationsStr = destinations
      .map((d: string) => destinationLabels[d] || d)
      .join(", ");
    const interestsStr = Array.isArray(interests) ? interests.join(", ") : interests || "—";
    const countryStr = country ? countryLabels[country] || country : "Not provided";
    const budgetStr = budget ? budgetLabels[budget] || budget : "Not specified";
    const howStr = howDidYouHear ? howDidYouHearLabels[howDidYouHear] || howDidYouHear : "Not specified";

    // Prepare admin email content
    const adminContent = `
        <h2>New Custom Tour Request</h2>
        <div class="info-row">
            <span class="info-label">Name:</span> ${escapeHtml(name)}
        </div>
        <div class="info-row">
            <span class="info-label">Email:</span> ${escapeHtml(email)}
        </div>
        <div class="info-row">
            <span class="info-label">Phone:</span> ${escapeHtml(phone)}
        </div>
        <div class="info-row">
            <span class="info-label">Country:</span> ${escapeHtml(countryStr)}
        </div>
        <div class="info-row">
            <span class="info-label">Destinations:</span> ${escapeHtml(destinationsStr)}
        </div>
        <div class="info-row">
            <span class="info-label">Travel Dates:</span> ${travelDates ? escapeHtml(travelDates) : "Not specified"}
        </div>
        <div class="info-row">
            <span class="info-label">Number of Travelers:</span> ${numberOfTravelers ? escapeHtml(numberOfTravelers) : "Not specified"}
        </div>
        <div class="info-row">
            <span class="info-label">Trip Duration:</span> ${tripDuration ? escapeHtml(tripDuration) : "Not specified"}
        </div>
        <div class="info-row">
            <span class="info-label">Budget (per person):</span> ${escapeHtml(budgetStr)}
        </div>
        <div class="info-row">
            <span class="info-label">Interests:</span> ${escapeHtml(interestsStr)}
        </div>
        <div class="info-row">
            <span class="info-label">Special Requirements:</span><br>
            ${specialRequirements ? escapeHtml(specialRequirements).replace(/\n/g, "<br>") : "None"}
        </div>
        <div class="info-row">
            <span class="info-label">How did they hear about us:</span> ${escapeHtml(howStr)}
        </div>
        <div class="info-row">
            <span class="info-label">Submitted:</span> ${new Date().toLocaleString()}
        </div>
    `;

    const adminBody = formatEmailBody(adminContent, "Custom Tour Request");

    const adminResult = await sendEmail(
      to,
      emailSubject,
      adminBody,
      email,
      name
    );

    // Prepare client confirmation email
    const clientSubject = "Thank you for your Custom Tour Request - Enchanting India Tours!";
    const clientContent = `
        <h2>Thank you for your custom tour request!</h2>
        <p>Dear ${escapeHtml(name)},</p>
        <p>Thank you for reaching out to Enchanting India Tours. We have received your custom tour request and our travel experts will create a personalized itinerary designed just for you.</p>
        
        <h3 style="color: #1e40af; margin-top: 20px;">Your Request Summary</h3>
        <div class="info-row">
            <span class="info-label">Destinations:</span> ${escapeHtml(destinationsStr)}
        </div>
        <div class="info-row">
            <span class="info-label">Travel Dates:</span> ${travelDates ? escapeHtml(travelDates) : "To be discussed"}
        </div>
        <div class="info-row">
            <span class="info-label">Number of Travelers:</span> ${numberOfTravelers ? escapeHtml(numberOfTravelers) : "To be discussed"}
        </div>
        <div class="info-row">
            <span class="info-label">Trip Duration:</span> ${tripDuration ? escapeHtml(tripDuration) : "To be discussed"}
        </div>
        <div class="info-row">
            <span class="info-label">Submitted:</span> ${new Date().toLocaleString()}
        </div>
        
        <h3 style="color: #1e40af; margin-top: 20px;">What happens next?</h3>
        <ul>
            <li>Our travel experts will review your preferences</li>
            <li>We will create a customized itinerary for you</li>
            <li>We will contact you within 24-48 hours with your personalized plan</li>
            <li>We will provide a detailed quote and answer any questions</li>
        </ul>
        
        <p style="margin-top: 20px;">Need immediate assistance? Contact us at info@enchantingindiatours.com or call 0120 4335461.</p>
        
        <p>With warm regards,<br>
        <strong>The Enchanting India Tours Team</strong></p>
    `;

    const clientBody = formatEmailBody(clientContent, "Thank you for your custom tour request");
    const clientResult = await sendEmail(email, clientSubject, clientBody);

    if (adminResult.success && clientResult.success) {
      logFormSubmission("custom-tour", req.body, req.ip || "unknown");

      return res.json({
        success: true,
        message:
          "Custom tour request submitted successfully. Check your email for confirmation.",
      });
    } else {
      return res.status(500).json({
        success: false,
        message:
          "Form submitted but email delivery failed. Please try again or contact us directly.",
      });
    }
  } catch (error: unknown) {
    console.error("Custom tour form error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
};

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

function logFormSubmission(
  formType: string,
  data: Record<string, unknown>,
  ip: string
): void {
  const logEntry = {
    timestamp: new Date().toISOString(),
    form_type: formType,
    data,
    ip,
  };

  try {
    appendFileSync(LOG_FILE, JSON.stringify(logEntry) + "\n", "utf-8");
  } catch (error) {
    console.error("Error logging form submission:", error);
  }
}
