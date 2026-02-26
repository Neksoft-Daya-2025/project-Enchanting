import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Mail, Settings, TestTube, Save, Lock, Eye, EyeOff } from "lucide-react";
import { api } from "@/services/api";

interface SMTPConfig {
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

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [config, setConfig] = useState<SMTPConfig>({
    smtp_host: "",
    smtp_port: 587,
    smtp_username: "",
    smtp_password: "",
    smtp_encryption: "tls",
    from_email: "noreply@enchantingindiatours.com",
    from_name: "Enchanting India Tours",
    to_email: "info@enchantingindiatours.com",
    reply_to: "info@enchantingindiatours.com",
  });

  // Check if already authenticated
  useEffect(() => {
    const authToken = sessionStorage.getItem("dashboard_auth");
    if (authToken) {
      setIsAuthenticated(true);
      loadSettings();
    }
  }, []);

  const handleLogin = async () => {
    if (!password) {
      toast.error("Please enter password");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await api.get("/smtp-settings", {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (data?.success) {
        sessionStorage.setItem("dashboard_auth", password);
        setIsAuthenticated(true);
        toast.success("Authentication successful");
        loadSettings();
      } else {
        toast.error("Invalid password");
      }
    } catch {
      toast.error("Invalid password");
    } finally {
      setIsLoading(false);
    }
  };

  const loadSettings = async () => {
    try {
      const authToken = sessionStorage.getItem("dashboard_auth");
      const { data: result } = await api.get("/smtp-settings", {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (result?.success && result.data) {
        setConfig((prev) => ({
          ...prev,
          ...result.data,
          smtp_password: "",
        }));
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const authToken = sessionStorage.getItem("dashboard_auth");
      const { data: result } = await api.post(
        "/smtp-settings",
        config,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      if (result?.success) {
        toast.success("SMTP settings saved successfully!");
        setConfig((prev) => ({ ...prev, smtp_password: "" }));
      } else {
        toast.error((result as { error?: string })?.error || "Failed to save settings");
      }
    } catch (err: unknown) {
      const e = err as { response?: { data?: { error?: string } }; message?: string };
      toast.error("Error saving settings: " + (e.response?.data?.error ?? e.message ?? "Unknown error"));
    } finally {
      setIsSaving(false);
    }
  };

  const handleTest = async () => {
    if (!config.smtp_host || !config.smtp_username || !config.smtp_password) {
      toast.error("Please fill in SMTP host, username, and password");
      return;
    }

    setIsTesting(true);
    try {
      const authToken = sessionStorage.getItem("dashboard_auth");
      const { data: result } = await api.post(
        "/test-smtp",
        { ...config, test_email: config.smtp_username },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      if (result?.success) {
        toast.success((result as { message?: string }).message || "Test email sent successfully!");
      } else {
        toast.error((result as { error?: string })?.error || "Failed to send test email");
      }
    } catch (err: unknown) {
      const e = err as { response?: { data?: { error?: string } }; message?: string };
      toast.error("Error testing SMTP: " + (e.response?.data?.error ?? e.message ?? "Unknown error"));
    } finally {
      setIsTesting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-0 shadow-xl">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
            <p className="text-gray-600 mt-2">Enter password to access SMTP settings</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleLogin();
                  }}
                  placeholder="Enter admin password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              {isLoading ? "Authenticating..." : "Login"}
            </Button>
            <p className="text-xs text-gray-500 text-center">
              Default password: admin123 (set DASHBOARD_PASSWORD in .env to change)
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">SMTP Settings Dashboard</h1>
          <p className="text-gray-600">Configure email server settings for form submissions</p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              SMTP Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="smtp_host">SMTP Host *</Label>
                <Input
                  id="smtp_host"
                  value={config.smtp_host}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, smtp_host: e.target.value }))
                  }
                  placeholder="smtp.gmail.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtp_port">SMTP Port *</Label>
                <Input
                  id="smtp_port"
                  type="number"
                  value={config.smtp_port}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      smtp_port: parseInt(e.target.value) || 587,
                    }))
                  }
                  placeholder="587"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtp_username">SMTP Username *</Label>
                <Input
                  id="smtp_username"
                  value={config.smtp_username}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, smtp_username: e.target.value }))
                  }
                  placeholder="your-email@gmail.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtp_password">SMTP Password *</Label>
                <div className="relative">
                  <Input
                    id="smtp_password"
                    type={showPassword ? "text" : "password"}
                    value={config.smtp_password}
                    onChange={(e) =>
                      setConfig((prev) => ({ ...prev, smtp_password: e.target.value }))
                    }
                    placeholder="Enter SMTP password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtp_encryption">Encryption *</Label>
                <Select
                  value={config.smtp_encryption}
                  onValueChange={(value: "tls" | "ssl") =>
                    setConfig((prev) => ({ ...prev, smtp_encryption: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tls">TLS (Port 587)</SelectItem>
                    <SelectItem value="ssl">SSL (Port 465)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="from_email">From Email *</Label>
                <Input
                  id="from_email"
                  type="email"
                  value={config.from_email}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, from_email: e.target.value }))
                  }
                  placeholder="noreply@enchantingindiatours.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="from_name">From Name *</Label>
                <Input
                  id="from_name"
                  value={config.from_name}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, from_name: e.target.value }))
                  }
                  placeholder="Enchanting India Tours"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="to_email">Admin Email (To) *</Label>
                <Input
                  id="to_email"
                  type="email"
                  value={config.to_email}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, to_email: e.target.value }))
                  }
                  placeholder="info@enchantingindiatours.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reply_to">Reply To Email</Label>
                <Input
                  id="reply_to"
                  type="email"
                  value={config.reply_to}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, reply_to: e.target.value }))
                  }
                  placeholder="info@enchantingindiatours.com"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save Settings"}
              </Button>
              <Button
                onClick={handleTest}
                disabled={isTesting}
                variant="outline"
                className="flex-1"
              >
                <TestTube className="w-4 h-4 mr-2" />
                {isTesting ? "Testing..." : "Test Connection"}
              </Button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Quick Setup Guide</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>Gmail:</strong> Use App Password (not regular password)</li>
                <li>• <strong>Host:</strong> smtp.gmail.com | <strong>Port:</strong> 587 | <strong>Encryption:</strong> TLS</li>
                <li>• <strong>Outlook:</strong> smtp-mail.outlook.com | Port: 587 | TLS</li>
                <li>• Click "Test Connection" to verify settings before saving</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

