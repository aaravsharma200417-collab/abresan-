import express from "express";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes - Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Server is healthy" });
  });

  // Proxy SMS Route to safely call Iranian SMS panel APIs from backend to keep API keys hidden
  app.post("/api/sms/send", async (req, res) => {
    try {
      const { to, type, params, config: clientConfig } = req.body;

      if (!to) {
        return res.status(400).json({ success: false, error: "Recipient phone number is required" });
      }

      // 1. Resolve configuration (Prefer server-side environment variables, fallback to client-side localStorage settings)
      const provider = process.env.SMS_PROVIDER || clientConfig?.provider || "simulated";
      const apiKey = process.env.SMS_API_KEY || clientConfig?.apiKey || "";
      const senderNumber = process.env.SMS_SENDER || clientConfig?.senderNumber || "";
      
      // Determine pattern code according to NotificationType
      let patternCode = "";
      if (type === "AUTH_CODE") {
        patternCode = process.env.SMS_OTP_PATTERN || clientConfig?.otpPattern || "";
      } else if (type === "ORDER_PLACED") {
        patternCode = process.env.SMS_ORDER_PLACED_PATTERN || clientConfig?.orderPlacedPattern || "";
      } else if (type === "ORDER_ADMIN_CONFIRM") {
        patternCode = process.env.SMS_ORDER_ADMIN_PATTERN || clientConfig?.orderAdminPattern || "";
      } else if (type === "ORDER_SHIPPED") {
        patternCode = process.env.SMS_ORDER_SHIPPED_PATTERN || clientConfig?.orderShippedPattern || "";
      }

      console.log(`[SMS-LOG] Requesting SMS send. Provider: ${provider}, Recipient: ${to}, Type: ${type}, Pattern: ${patternCode}`);

      if (provider === "simulated") {
        return res.json({
          success: true,
          simulated: true,
          message: `ارسال پیامک شبیه‌سازی‌شده پیروزمندانه بود. گیرنده: ${to}، الگو: ${patternCode || "پیش‌فرض"}`
        });
      }

      if (!apiKey) {
        return res.status(400).json({ 
          success: false, 
          error: "کلید وب سرویس پیامک وارد نشده است. لطفاً در بخش تنظیمات وارد نمایید." 
        });
      }

      // Convert variables to secure safe strings/params
      const plainParams = params || {};
      
      let fetchedResponse;
      let responseBodyText = "";

      // 2. Route messages based on SMS gateway provider
      if (provider === "ippanel" || provider === "farazsms") {
        // FarazSMS/IPPanel Pattern Send REST API
        const targetPattern = patternCode || "default";
        const postData = {
          pattern_code: targetPattern,
          originator: senderNumber || "+983000505",
          recipient: to,
          values: {
            code: plainParams.code || "",
            name: plainParams.name || "",
            orderId: plainParams.orderId || "",
            price: plainParams.price || "",
            trackingCode: plainParams.trackingCode || "",
            ...plainParams
          }
        };

        const response = await fetch("https://api2.ippanel.com/api/v1/sms/pattern/normal/send", {
          method: "POST",
          headers: {
            "Authorization": `AccessKey ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(postData)
        });
        
        fetchedResponse = response;
        responseBodyText = await response.text();
      } 
      else if (provider === "kavenegar") {
        // Kavenegar Verify Lookup API (Instant pattern delivery bypasses blacklist)
        const targetPattern = patternCode || "authCode";
        
        // Kavenegar requires token, token2, token3 for pattern placeholders
        const token = plainParams.code || plainParams.orderId || plainParams.trackingCode || "";
        const token2 = plainParams.name || plainParams.price || "";
        const token3 = plainParams.price || "";

        const queryParams = new URLSearchParams({
          receptor: to,
          token: token,
          token2: token2,
          token3: token3,
          template: targetPattern
        });

        const url = `https://api.kavenegar.com/v1/${apiKey}/verify/lookup.json?${queryParams.toString()}`;
        
        const response = await fetch(url, { method: "GET" });
        fetchedResponse = response;
        responseBodyText = await response.text();
      } 
      else if (provider === "melipayamak") {
        // Melipayamak SOAP-alternative Base Service sending
        let username = "";
        let password = "";
        
        if (apiKey.includes(":")) {
          const parts = apiKey.split(":");
          username = parts[0];
          password = parts[1];
        } else {
          username = apiKey;
          password = ""; // assuming single token
        }

        const bodyData = {
          username: username,
          password: password,
          text: [
            plainParams.code || "",
            plainParams.name || "",
            plainParams.orderId || "",
            plainParams.price || "",
            plainParams.trackingCode || ""
          ].filter(Boolean).join(";"),
          to: to,
          bodyId: parseInt(patternCode || "0", 10)
        };

        const response = await fetch("https://rest.payamak-panel.com/api/SendSMS/BaseServiceNumber", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyData)
        });

        fetchedResponse = response;
        responseBodyText = await response.text();
      }
      else {
        return res.status(400).json({ success: false, error: `پشتیبانی ارائه‌دهنده ${provider} هنوز فعال نگشته است.` });
      }

      console.log(`[SMS-LOG] Gateway response status: ${fetchedResponse.status}, Body: ${responseBodyText}`);

      if (fetchedResponse.status >= 200 && fetchedResponse.status < 300) {
        return res.json({
          success: true,
          providerResponse: responseBodyText,
          message: "پیامک بر بستر وب سرویس با توفیق به ارائه‌دهنده تحویل داده شد."
        });
      } else {
        return res.status(500).json({
          success: false,
          status: fetchedResponse.status,
          error: "سرویس‌دهنده پیامک پاسخ خطایی ارسال کرد",
          details: responseBodyText
        });
      }

    } catch (err: any) {
      console.error("[SMS-ERROR] Failed to send SMS:", err);
      return res.status(500).json({
        success: false,
        error: "اختلال داخلی سیستم در ارسال درخواست پیامک",
        details: err?.message || err
      });
    }
  });

  // Sample API for industrial products (can be expanded)
  app.get("/api/products", (req, res) => {
    res.json([
      { id: 1, name: "Product A", category: "Industrial" },
      { id: 2, name: "Product B", category: "Commercial" }
    ]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer } = await import("vite");
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    if (process.env.NODE_ENV !== "production") {
      console.log(`Server running on http://localhost:${PORT}`);
    }
  });
}

startServer();
