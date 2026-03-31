/**
 * Email Sender
 * Handles sending emails using Nodemailer with SMTP
 */

import nodemailer from "nodemailer";
import { getEmailConfig, type EmailConfig } from "./email-config";
import { appendFileSync, existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const LOG_FILE = join(process.cwd(), "email-logs.json");

/**
 * Format email body with header and footer
 */
export function formatEmailBody(content: string, title: string = ""): string {
  const config = getEmailConfig();

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
                color: white;
                padding: 30px 20px;
                text-align: center;
                border-radius: 10px 10px 0 0;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .content {
                background: #ffffff;
                padding: 30px 20px;
                border: 1px solid #e0e0e0;
            }
            .footer {
                background: #f8f8f8;
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #666;
                border-radius: 0 0 10px 10px;
            }
            .info-row {
                margin: 10px 0;
                padding: 10px;
                background: #f9f9f9;
                border-left: 3px solid #3b82f6;
            }
            .info-label {
                font-weight: bold;
                color: #1e40af;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>✈️ Enchanting India Tours</h1>
            ${title ? `<p>${escapeHtml(title)}</p>` : ""}
        </div>
        <div class="content">
            ${content}
        </div>
        <div class="footer">
            <p><strong>Enchanting India Tours</strong></p>
            <p>Email: info@enchantingindiatours.com</p>
            <p>Premier South Asia DMC</p>
            <p style="margin-top: 15px; font-size: 11px;">
                This email was sent from the Enchanting India Tours website contact system.
            </p>
        </div>
    </body>
    </html>
  `;
}

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
 * Send email using SMTP
 */
export async function sendEmail(
  to: string,
  subject: string,
  body: string,
  replyToEmail?: string,
  replyToName?: string
): Promise<{ success: boolean; message: string }> {
  const config = getEmailConfig();

  // Check if SMTP is configured
  if (!config.smtp_host || !config.smtp_username) {
    // Fall back to basic email (would need mail() equivalent in Node.js)
    logEmail(to, subject, "failed", "SMTP not configured");
    return {
      success: false,
      message: "SMTP is not configured. Please configure email settings.",
    };
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: config.smtp_host,
      port: config.smtp_port,
      secure: config.smtp_encryption === "ssl",
      auth: {
        user: config.smtp_username,
        pass: config.smtp_password,
      },
      tls: {
        rejectUnauthorized: false, // For self-signed certificates
      },
    });

    // Verify connection
    await transporter.verify();

    // Email options
    const mailOptions = {
      from: `${config.from_name} <${config.from_email}>`,
      to: to,
      subject: subject,
      html: body,
      text: stripHtml(body), // Plain text version
      replyTo: replyToEmail
        ? replyToName
          ? `${replyToName} <${replyToEmail}>`
          : replyToEmail
        : config.reply_to,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    // Log success
    logEmail(to, subject, "sent", "SMTP");

    return {
      success: true,
      message: "Email sent successfully",
    };
  } catch (error: any) {
    // Log error
    const errorMessage = error.message || "Unknown error";
    logEmail(to, subject, "failed", `SMTP - ${errorMessage}`);

    return {
      success: false,
      message: `Failed to send email: ${errorMessage}`,
    };
  }
}

/**
 * Strip HTML tags for plain text version
 */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ");
}

/**
 * Log email sending attempt
 */
function logEmail(
  to: string,
  subject: string,
  status: "sent" | "failed",
  method: string = ""
): void {
  const logEntry = {
    to,
    subject,
    status,
    method,
    date: new Date().toISOString(),
    timestamp: Date.now(),
  };

  let logs: any[] = [];

  if (existsSync(LOG_FILE)) {
    try {
      logs = JSON.parse(readFileSync(LOG_FILE, "utf-8"));
    } catch (error) {
      console.error("Error reading email logs:", error);
    }
  }

  logs.push(logEntry);

  // Keep only last 100 logs
  if (logs.length > 100) {
    logs = logs.slice(-100);
  }

  try {
    writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
  } catch (error) {
    console.error("Error writing email logs:", error);
  }
}

