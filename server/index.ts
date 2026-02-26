import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleForm } from "./routes/form";
import {
  getSMTPSettings,
  saveSMTPSettings,
  testSMTPConnection,
} from "./routes/smtp-settings";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Unified form submission route (contact, enquiry, custom-tour)
  app.post("/api/form", handleForm);

  // SMTP Settings routes
  app.get("/api/smtp-settings", getSMTPSettings);
  app.post("/api/smtp-settings", saveSMTPSettings);
  app.post("/api/test-smtp", testSMTPConnection);

  return app;
}
