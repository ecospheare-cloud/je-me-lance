import { NextRequest, NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;
const NOTIFY_SECRET = process.env.NOTIFY_SECRET;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "je-me-lance.fr <onboarding@resend.dev>";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-notify-secret");
  if (!NOTIFY_SECRET || secret !== NOTIFY_SECRET) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { title, slug, excerpt } = await req.json();
  if (!title || !slug) {
    return NextResponse.json({ error: "title et slug requis" }, { status: 400 });
  }

  if (!RESEND_API_KEY || !RESEND_AUDIENCE_ID) {
    return NextResponse.json({ error: "Service email non configuré" }, { status: 500 });
  }

  const broadcastRes = await fetch("https://api.resend.com/broadcasts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      audienceId: RESEND_AUDIENCE_ID,
      from: FROM_EMAIL,
      subject: `Nouvel article : ${title}`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
          <h2 style="color:#16A34A;">Nouvel article sur je-me-lance.fr 📝</h2>
          <h3>${title}</h3>
          <p>${excerpt || ""}</p>
          <p><a href="https://je-me-lance.fr/blog/${slug}" style="color:#22C55E; font-weight:bold;">Lire l'article →</a></p>
          <p style="color:#94A3B8; font-size:12px; margin-top:32px;">Tu reçois cet email car tu es inscrit à la newsletter de je-me-lance.fr.</p>
        </div>
      `,
    }),
  });

  if (!broadcastRes.ok) {
    const details = await broadcastRes.text();
    return NextResponse.json({ error: "Échec création broadcast", details }, { status: 502 });
  }

  const broadcast = await broadcastRes.json();

  const sendRes = await fetch(`https://api.resend.com/broadcasts/${broadcast.id}/send`, {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}` },
  });

  if (!sendRes.ok) {
    const details = await sendRes.text();
    return NextResponse.json({ error: "Échec envoi broadcast", details }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
