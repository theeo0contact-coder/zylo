export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const body = req.body;

  const payload = {
    embeds: [
      {
        title: "📦 Ny Zylo Beställning",
        color: 65280,
        fields: [
          { name: "Item", value: body.item || "N/A" },
          { name: "Antal", value: body.amount || "N/A" },
          { name: "Discord", value: body.discord || "N/A" },
          { name: "Minecraft", value: body.mc || "N/A" },
          { name: "Deadline", value: body.deadline || "N/A" }
        ],
        footer: {
          text: "Zylo Order System"
        }
      }
    ]
  };

  try {
    await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Webhook failed" });
  }
}
