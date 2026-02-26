/**
 * Unified Form Handler
 * Handles Contact, Enquiry, and Custom Tour form submissions through a single endpoint
 */

import { RequestHandler } from "express";
import { sendEmail, formatEmailBody } from "../utils/email-sender";
import { getEmailConfig } from "../utils/email-config";
import { appendFileSync } from "fs";
import { join } from "path";

const LOG_FILE = join(process.cwd(), "form_submissions.log");

type FormType = "contact" | "enquiry" | "custom-tour";

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

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const handleForm: RequestHandler = async (req, res) => {
  try {
    const { formType, ...data } = req.body as { formType?: FormType } & Record<string, unknown>;

    if (!formType || !["contact", "enquiry", "custom-tour"].includes(formType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing form type. Must be: contact, enquiry, or custom-tour",
      });
    }

    const config = getEmailConfig();
    const to = config.to_email;
    const ip = req.ip || "unknown";

    if (formType === "contact") {
      const { name, email, company, phone, subject, message, enquiryType } = data as {
        name?: string;
        email?: string;
        company?: string;
        phone?: string;
        subject?: string;
        message?: string;
        enquiryType?: string;
      };

      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields: name, email, and message are required",
        });
      }
      if (!validateEmail(email)) {
        return res.status(400).json({ success: false, message: "Invalid email address" });
      }

      const emailSubject = `New Contact Form Submission - ${subject || "General Inquiry"}`;
      const adminContent = `
        <h2>New Contact Form Submission</h2>
        <div class="info-row"><span class="info-label">Name:</span> ${escapeHtml(name)}</div>
        <div class="info-row"><span class="info-label">Email:</span> ${escapeHtml(email)}</div>
        <div class="info-row"><span class="info-label">Company:</span> ${company ? escapeHtml(company) : "Not provided"}</div>
        <div class="info-row"><span class="info-label">Phone:</span> ${phone ? escapeHtml(phone) : "Not provided"}</div>
        <div class="info-row"><span class="info-label">Subject:</span> ${subject ? escapeHtml(subject) : "General Inquiry"}</div>
        <div class="info-row"><span class="info-label">Enquiry Type:</span> ${enquiryType ? escapeHtml(enquiryType) : "Not specified"}</div>
        <div class="info-row"><span class="info-label">Message:</span><br>${escapeHtml(message).replace(/\n/g, "<br>")}</div>
        <div class="info-row"><span class="info-label">Submitted:</span> ${new Date().toLocaleString()}</div>
      `;

      const clientSubject = "Thank you for contacting Enchanting India Tours!";
      const clientContent = `
        <h2>Thank you for your inquiry!</h2>
        <p>Dear ${escapeHtml(name)},</p>
        <p>Thank you for reaching out to Enchanting India Tours. We have received your message and will get back to you within 24 hours.</p>
        <h3 style="color: #1e40af; margin-top: 20px;">Your Inquiry Details</h3>
        <div class="info-row"><span class="info-label">Subject:</span> ${subject ? escapeHtml(subject) : "General Inquiry"}</div>
        <div class="info-row"><span class="info-label">Message:</span><br>${escapeHtml(message).replace(/\n/g, "<br>")}</div>
        <div class="info-row"><span class="info-label">Submitted:</span> ${new Date().toLocaleString()}</div>
        <h3 style="color: #1e40af; margin-top: 20px;">What happens next?</h3>
        <ul><li>Our team will review your inquiry</li><li>We will contact you within 24 hours</li><li>We will provide detailed information about our tours</li><li>We will help you plan your perfect travel experience</li></ul>
        <p style="margin-top: 20px;">If you have any urgent questions, please contact us at info@enchantingindiatours.com.</p>
        <p>With warm regards,<br><strong>The Enchanting India Tours Team</strong></p>
      `;

      const adminResult = await sendEmail(to, emailSubject, formatEmailBody(adminContent, "Contact Form Submission"), email, name);
      const clientResult = await sendEmail(email, clientSubject, formatEmailBody(clientContent, "Thank you for your inquiry"));

      if (adminResult.success && clientResult.success) {
        logFormSubmission("contact", req.body, ip);
        return res.json({ success: true, message: "Contact form submitted successfully. Check your email for confirmation." });
      }
      return res.status(500).json({ success: false, message: "Form submitted but email delivery failed. Please try again or contact us directly." });
    }

    if (formType === "enquiry") {
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
      } = data as Record<string, unknown>;

      if (!companyName || !contactPerson || !email || !phone) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields: company name, contact person, email, and phone are required",
        });
      }
      if (!validateEmail(email as string)) {
        return res.status(400).json({ success: false, message: "Invalid email address" });
      }

      const dests = Array.isArray(destinations) ? (destinations as string[]).join(", ") : "Not specified";
      const svcs = Array.isArray(services) ? (services as string[]).join(", ") : "Not specified";

      const emailSubject = "🎫 New Partnership Enquiry - Enchanting India Tours";
      const adminContent = `
        <h2>New Partnership Enquiry</h2>
        <p><strong>A company has submitted a partnership enquiry!</strong></p>
        <h3 style="color: #1e40af; margin-top: 20px;">Company Information</h3>
        <div class="info-row"><span class="info-label">Company Name:</span> ${escapeHtml(String(companyName))}</div>
        <div class="info-row"><span class="info-label">Contact Person:</span> ${escapeHtml(String(contactPerson))}</div>
        <div class="info-row"><span class="info-label">Email:</span> ${escapeHtml(String(email))}</div>
        <div class="info-row"><span class="info-label">Phone:</span> ${escapeHtml(String(phone))}</div>
        <div class="info-row"><span class="info-label">Website:</span> ${website ? escapeHtml(String(website)) : "Not provided"}</div>
        <div class="info-row"><span class="info-label">Country:</span> ${country ? escapeHtml(String(country)) : "Not provided"}</div>
        <h3 style="color: #1e40af; margin-top: 20px;">Travel Requirements</h3>
        <div class="info-row"><span class="info-label">Destinations:</span> ${escapeHtml(dests)}</div>
        <div class="info-row"><span class="info-label">Travel Dates:</span> ${travelDates ? escapeHtml(String(travelDates)) : "Not specified"}</div>
        <div class="info-row"><span class="info-label">Group Size:</span> ${groupSize ? escapeHtml(String(groupSize)) : "Not specified"}</div>
        <div class="info-row"><span class="info-label">Duration:</span> ${duration ? escapeHtml(String(duration)) : "Not specified"}</div>
        <div class="info-row"><span class="info-label">Budget:</span> ${budget ? escapeHtml(String(budget)) : "Not specified"}</div>
        <h3 style="color: #1e40af; margin-top: 20px;">Service Requirements</h3>
        <div class="info-row"><span class="info-label">Services:</span> ${escapeHtml(svcs)}</div>
        <div class="info-row"><span class="info-label">Special Requirements:</span><br>${specialRequirements ? escapeHtml(String(specialRequirements)).replace(/\n/g, "<br>") : "None"}</div>
        <h3 style="color: #1e40af; margin-top: 20px;">Partnership Details</h3>
        <div class="info-row"><span class="info-label">Partnership Type:</span> ${partnershipType ? escapeHtml(String(partnershipType)) : "Not specified"}</div>
        <div class="info-row"><span class="info-label">Target Market:</span> ${targetMarket ? escapeHtml(String(targetMarket)) : "Not specified"}</div>
        <div class="info-row"><span class="info-label">Monthly Volume:</span> ${monthlyVolume ? escapeHtml(String(monthlyVolume)) : "Not specified"}</div>
        <h3 style="color: #1e40af; margin-top: 20px;">Additional Information</h3>
        <div class="info-row"><span class="info-label">Additional Info:</span><br>${additionalInfo ? escapeHtml(String(additionalInfo)).replace(/\n/g, "<br>") : "None"}</div>
        <div class="info-row"><span class="info-label">How did you hear about us:</span> ${howDidYouHear ? escapeHtml(String(howDidYouHear)) : "Not specified"}</div>
        <div class="info-row"><span class="info-label">Submitted:</span> ${new Date().toLocaleString()}</div>
      `;

      const clientSubject = "Thank you for your Partnership Enquiry - Enchanting India Tours";
      const clientContent = `
        <h2>Thank you for your partnership enquiry!</h2>
        <p>Dear ${escapeHtml(String(contactPerson))},</p>
        <p>Thank you for your interest in partnering with Enchanting India Tours. We have received your enquiry and will review it shortly.</p>
        <h3 style="color: #1e40af; margin-top: 20px;">Your Enquiry Details</h3>
        <div class="info-row"><span class="info-label">Company:</span> ${escapeHtml(String(companyName))}</div>
        <div class="info-row"><span class="info-label">Partnership Type:</span> ${partnershipType ? escapeHtml(String(partnershipType)) : "Not specified"}</div>
        <div class="info-row"><span class="info-label">Destinations:</span> ${escapeHtml(dests)}</div>
        <div class="info-row"><span class="info-label">Submitted:</span> ${new Date().toLocaleString()}</div>
        <h3 style="color: #1e40af; margin-top: 20px;">What happens next?</h3>
        <ul><li>Our partnership team will review your enquiry</li><li>We will contact you within 24-48 hours</li><li>We will discuss partnership opportunities</li><li>We will provide detailed information about our services</li><li>We will guide you through the partnership process</li></ul>
        <p style="margin-top: 20px;">If you have any questions about your enquiry, please contact us at info@enchantingindiatours.com.</p>
        <p>We look forward to working with you!<br><strong>The Enchanting India Tours Team</strong></p>
      `;

      const adminResult = await sendEmail(to, emailSubject, formatEmailBody(adminContent, "Partnership Enquiry"), email as string, contactPerson as string);
      const clientResult = await sendEmail(email as string, clientSubject, formatEmailBody(clientContent, "Partnership Enquiry Confirmation"));

      if (adminResult.success && clientResult.success) {
        logFormSubmission("enquiry", req.body, ip);
        return res.json({ success: true, message: "Enquiry submitted successfully. Check your email for confirmation." });
      }
      return res.status(500).json({ success: false, message: "Form submitted but email delivery failed. Please try again or contact us directly." });
    }

    if (formType === "custom-tour") {
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
      } = data as Record<string, unknown>;

      if (!name || !email || !phone) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields: name, email, and phone are required",
        });
      }
      if (!validateEmail(email as string)) {
        return res.status(400).json({ success: false, message: "Invalid email address" });
      }
      if (!destinations || !Array.isArray(destinations) || (destinations as string[]).length === 0) {
        return res.status(400).json({
          success: false,
          message: "Please select at least one destination",
        });
      }

      const destinationLabels: Record<string, string> = {
        india: "India",
        "sri-lanka": "Sri Lanka",
        nepal: "Nepal",
        bhutan: "Bhutan",
      };
      const countryLabels: Record<string, string> = {
        usa: "United States", uk: "United Kingdom", canada: "Canada", australia: "Australia",
        germany: "Germany", france: "France", spain: "Spain", italy: "Italy", india: "India", other: "Other",
      };
      const budgetLabels: Record<string, string> = {
        "under-1000": "Under $1,000", "1000-2000": "$1,000 - $2,000", "2000-5000": "$2,000 - $5,000",
        "5000-10000": "$5,000 - $10,000", "10000+": "$10,000+",
      };
      const howLabels: Record<string, string> = {
        search: "Search Engine", social: "Social Media", referral: "Referral", friend: "Friend or Family",
        "travel-blog": "Travel Blog", other: "Other",
      };

      const destinationsStr = (destinations as string[]).map((d) => destinationLabels[d] || d).join(", ");
      const interestsStr = Array.isArray(interests) ? (interests as string[]).join(", ") : "—";
      const countryStr = country ? (countryLabels[country as string] || String(country)) : "Not provided";
      const budgetStr = budget ? (budgetLabels[budget as string] || String(budget)) : "Not specified";
      const howStr = howDidYouHear ? (howLabels[howDidYouHear as string] || String(howDidYouHear)) : "Not specified";

      const emailSubject = "New Custom Tour Request - Enchanting India Tours";
      const adminContent = `
        <h2>New Custom Tour Request</h2>
        <div class="info-row"><span class="info-label">Name:</span> ${escapeHtml(String(name))}</div>
        <div class="info-row"><span class="info-label">Email:</span> ${escapeHtml(String(email))}</div>
        <div class="info-row"><span class="info-label">Phone:</span> ${escapeHtml(String(phone))}</div>
        <div class="info-row"><span class="info-label">Country:</span> ${escapeHtml(countryStr)}</div>
        <div class="info-row"><span class="info-label">Destinations:</span> ${escapeHtml(destinationsStr)}</div>
        <div class="info-row"><span class="info-label">Travel Dates:</span> ${travelDates ? escapeHtml(String(travelDates)) : "Not specified"}</div>
        <div class="info-row"><span class="info-label">Number of Travelers:</span> ${numberOfTravelers ? escapeHtml(String(numberOfTravelers)) : "Not specified"}</div>
        <div class="info-row"><span class="info-label">Trip Duration:</span> ${tripDuration ? escapeHtml(String(tripDuration)) : "Not specified"}</div>
        <div class="info-row"><span class="info-label">Budget (per person):</span> ${escapeHtml(budgetStr)}</div>
        <div class="info-row"><span class="info-label">Interests:</span> ${escapeHtml(interestsStr)}</div>
        <div class="info-row"><span class="info-label">Special Requirements:</span><br>${specialRequirements ? escapeHtml(String(specialRequirements)).replace(/\n/g, "<br>") : "None"}</div>
        <div class="info-row"><span class="info-label">How did they hear about us:</span> ${escapeHtml(howStr)}</div>
        <div class="info-row"><span class="info-label">Submitted:</span> ${new Date().toLocaleString()}</div>
      `;

      const clientSubject = "Thank you for your Custom Tour Request - Enchanting India Tours!";
      const clientContent = `
        <h2>Thank you for your custom tour request!</h2>
        <p>Dear ${escapeHtml(String(name))},</p>
        <p>Thank you for reaching out to Enchanting India Tours. We have received your custom tour request and our travel experts will create a personalized itinerary designed just for you.</p>
        <h3 style="color: #1e40af; margin-top: 20px;">Your Request Summary</h3>
        <div class="info-row"><span class="info-label">Destinations:</span> ${escapeHtml(destinationsStr)}</div>
        <div class="info-row"><span class="info-label">Travel Dates:</span> ${travelDates ? escapeHtml(String(travelDates)) : "To be discussed"}</div>
        <div class="info-row"><span class="info-label">Number of Travelers:</span> ${numberOfTravelers ? escapeHtml(String(numberOfTravelers)) : "To be discussed"}</div>
        <div class="info-row"><span class="info-label">Trip Duration:</span> ${tripDuration ? escapeHtml(String(tripDuration)) : "To be discussed"}</div>
        <div class="info-row"><span class="info-label">Submitted:</span> ${new Date().toLocaleString()}</div>
        <h3 style="color: #1e40af; margin-top: 20px;">What happens next?</h3>
        <ul><li>Our travel experts will review your preferences</li><li>We will create a customized itinerary for you</li><li>We will contact you within 24-48 hours with your personalized plan</li><li>We will provide a detailed quote and answer any questions</li></ul>
        <p style="margin-top: 20px;">Need immediate assistance? Contact us at info@enchantingindiatours.com or call 0120 4335461.</p>
        <p>With warm regards,<br><strong>The Enchanting India Tours Team</strong></p>
      `;

      const adminResult = await sendEmail(to, emailSubject, formatEmailBody(adminContent, "Custom Tour Request"), email as string, name as string);
      const clientResult = await sendEmail(email as string, clientSubject, formatEmailBody(clientContent, "Thank you for your custom tour request"));

      if (adminResult.success && clientResult.success) {
        logFormSubmission("custom-tour", req.body, ip);
        return res.json({ success: true, message: "Custom tour request submitted successfully. Check your email for confirmation." });
      }
      return res.status(500).json({ success: false, message: "Form submitted but email delivery failed. Please try again or contact us directly." });
    }

    return res.status(400).json({ success: false, message: "Invalid form type" });
  } catch (error: unknown) {
    console.error("Form handler error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
};
