/**
 * Email Configuration
 * Centralized email settings for the website
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

export interface EmailConfig {
  smtp_host: string;
  smtp_port: number;
  smtp_username: string;
  smtp_password: string;
  smtp_encryption: "tls" | "ssl";
  from_email: string;
  from_name: string;
  to_email: string;
  reply_to: string;
}

const CONFIG_FILE = join(process.cwd(), "smtp-config.json");

/**
 * Get email configuration
 */
export function getEmailConfig(): EmailConfig {
  // Try to load from JSON file
  if (existsSync(CONFIG_FILE)) {
    try {
      const config = JSON.parse(readFileSync(CONFIG_FILE, "utf-8"));
      if (config) {
        return config;
      }
    } catch (error) {
      console.error("Error reading email config:", error);
    }
  }

  // Default configuration (fallback)
  return {
    smtp_host: process.env.SMTP_HOST || "",
    smtp_port: parseInt(process.env.SMTP_PORT || "587"),
    smtp_username: process.env.SMTP_USERNAME || "",
    smtp_password: process.env.SMTP_PASSWORD || "",
    smtp_encryption: (process.env.SMTP_ENCRYPTION as "tls" | "ssl") || "tls",
    from_email: process.env.FROM_EMAIL || "noreply@enchantingindiatours.com",
    from_name: process.env.FROM_NAME || "Enchanting India Tours",
    to_email: process.env.TO_EMAIL || "info@enchantingindiatours.com",
    reply_to: process.env.REPLY_TO || "info@enchantingindiatours.com",
  };
}

/**
 * Save SMTP configuration
 */
export function saveEmailConfig(config: EmailConfig): boolean {
  try {
    writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
    return true;
  } catch (error) {
    console.error("Error saving email config:", error);
    return false;
  }
}

