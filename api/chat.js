const https = require("https");
const url = require("url");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    res.status(500).json({ error: "Webhook URL not configured" });
    return;
  }

  try {
    const { message } = req.body;
    const params = new URLSearchParams({ message });
    const targetUrl = `${webhookUrl}?${params}`;
    const parsed = new URL(targetUrl);

    const data = await new Promise((resolve, reject) => {
      const request = https.get(
        {
          hostname: parsed.hostname,
          path: parsed.pathname + parsed.search,
          headers: { Accept: "application/json" },
        },
        (response) => {
          let body = "";
          response.on("data", (chunk) => (body += chunk));
          response.on("end", () => {
            try {
              resolve(JSON.parse(body));
            } catch {
              resolve(body);
            }
          });
        }
      );
      request.on("error", reject);
    });

    res.status(200).json(data);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
};
