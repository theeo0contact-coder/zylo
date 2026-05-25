export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Only POST");

  const body = req.body;

  const payload = {
    embeds: [{
      title: "📦 Ny beställning - Zylo",
      color: 65280,
      fields: [
        { name: "Item", value: body.item },
        { name: "Antal", value: body.amount },
        { name: "Discord", value: body.discord },
        { name: "Minecraft", value: body.mc },
        { name: "Deadline", value: body.deadline }
      ]
    }]
  };

  await fetch(process.env.DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  res.status(200).json({ ok: true });
}
