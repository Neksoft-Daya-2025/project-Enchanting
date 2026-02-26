/**
 * SMTP Settings API
 * Handles SMTP configuration loading and saving
 */

import { RequestHandler } from "express";
import { getEmailConfig, saveEmailConfig } from "../utils/email-config";
import { sendEmail, formatEmailBody } from "../utils/email-sender";

// Simple password protection (you can enhance this later)
const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD || "admin123";

/**
 * Check authentication
 */
function requireAuth(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ success: false, message: "Authentication required" });
  }

  const token = authHeader.replace("Bearer ", "");
  
  // Simple token check (in production, use proper JWT or session)
  if (token !== DASHBOARD_PASSWORD) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  next();
}

/**
 * GET: Load SMTP settings
 */
export const getSMTPSettings: RequestHandler = async (req, res) => {
  try {
    const config = getEmailConfig();
    // Don't send password in response
    const { smtp_password, ...safeConfig } = config;
    return res.json({
      success: true,
      data: safeConfig,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to load SMTP settings: " + error.message,
    });
  }
};

/**
 * POST: Save SMTP settings (requires authentication)
 */
export const saveSMTPSettings: RequestHandler = async (req, res) => {
  try {
    // Require authentication for saving
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader.replace("Bearer ", "") !== DASHBOARD_PASSWORD) {
      return res.status(401).json({
        success: false,
        message: "Authentication required to save settings",
      });
    }

    const {
      smtp_host,
      smtp_port,
      smtp_username,
      smtp_password,
      smtp_encryption,
      from_email,
      from_name,
      to_email,
      reply_to,
    } = req.body;

    const config = {
      smtp_host: smtp_host || "",
      smtp_port: smtp_port || 587,
      smtp_username: smtp_username || "",
      smtp_password: smtp_password || "",
      smtp_encryption: (smtp_encryption === "ssl" ? "ssl" : "tls") as "tls" | "ssl",
      from_email: from_email || "noreply@enchantingindiatours.com",
      from_name: from_name || "Enchanting India Tours",
      to_email: to_email || "info@enchantingindiatours.com",
      reply_to: reply_to || "info@enchantingindiatours.com",
    };

    const saved = saveEmailConfig(config);

    if (saved) {
      return res.json({
        success: true,
        message: "SMTP settings saved successfully",
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Failed to save settings",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to save SMTP settings: " + error.message,
    });
  }
};

/**
 * POST: Test SMTP connection
 */
export const testSMTPConnection: RequestHandler = async (req, res) => {
  try {
    // Require authentication
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader.replace("Bearer ", "") !== DASHBOARD_PASSWORD) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const config = req.body;

    // Validate required fields
    if (!config.smtp_host || !config.smtp_username || !config.smtp_password) {
      return res.status(400).json({
        success: false,
        error: "Missing required SMTP settings",
      });
    }

    // Try to send a test email
    const testEmail = config.test_email || config.smtp_username;
    const testSubject = "Test Email - Enchanting India Tours";
    const testContent = `
      <h2>SMTP Configuration Test</h2>
      <p>This is a test email to verify your SMTP settings are configured correctly.</p>
      <p>If you received this email, your SMTP configuration is working properly!</p>
      <p><strong>Test Time:</strong> ${new Date().toLocaleString()}</p>
    `;

    const testBody = formatEmailBody(testContent, "SMTP Test");

    // Temporarily save config for testing
    const originalConfig = getEmailConfig();
    saveEmailConfig(config as any);

    try {
      const result = await sendEmail(testEmail, testSubject, testBody);

      // Restore original config
      saveEmailConfig(originalConfig);

      if (result.success) {
        return res.json({
          success: true,
          message: `Test email sent successfully to ${testEmail}`,
        });
      } else {
        return res.status(500).json({
          success: false,
          error: result.message,
        });
      }
    } catch (error: any) {
      // Restore original config
      saveEmailConfig(originalConfig);
      throw error;
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to test SMTP connection: " + error.message,
    });
  }
};

