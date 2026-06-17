import { NextRequest, NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "je-me-lance.fr <onboarding@resend.dev>";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Email invalide" }, { status: 400 });
  }

  if (!RESEND_API_KEY || !RESEND_AUDIENCE_ID) {
    return NextResponse.json(
      { error: "Service d'inscription non configuré" },
      { status: 500 }
    );
  }

  const contactRes = await fetch(
    `https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, unsubscribed: false }),
    }
  );

  if (!contactRes.ok) {
    const errBody = await contactRes.text();
    return NextResponse.json(
      { error: "Inscription impossible", details: errBody },
      { status: 502 }
    );
  }

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: email,
      subject: "Merci pour ton inscription ! 🎉",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
          <h2 style="color:#16A34A;">Bienvenue sur je-me-lance.fr 👋</h2>
          <p>Merci pour ton inscription ! Tu recevras désormais un email chaque fois qu'un nouvel article est publié : auto-entrepreneur, statut juridique, premiers clients, business plan...</p>
          <p>En attendant, tu peux déjà parcourir nos guides :</p>
          <p><a href="https://je-me-lance.fr/blog" style="color:#22C55E; font-weight:bold;">Voir tous les articles →</a></p>
          <p style="color:#94A3B8; font-size:12px; margin-top:32px;">Tu peux te désinscrire à tout moment.</p>
        </div>
      `,
    }),
  });

  return NextResponse.json({ success: true });
}
