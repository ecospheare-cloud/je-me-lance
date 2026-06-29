// Cloudflare Worker — remplace /api/subscribe, /api/notify et /api/blog-posts
// de Next.js, car GitHub Pages n'héberge que du statique (pas de serveur Node.js).
//
// Routes : POST /        → inscription newsletter + email de bienvenue
//          POST /notify  → annonce d'un nouvel article à la liste
//          POST /publish → publication d'un article (commit GitHub direct)
//
// Déploiement (gratuit, ~2 min) :
// 1. https://dash.cloudflare.com → Workers & Pages → Create → Worker
// 2. Colle ce fichier dans l'éditeur, clique "Deploy"
// 3. Settings → Variables → ajoute les secrets :
//      RESEND_API_KEY, RESEND_AUDIENCE_ID, RESEND_FROM_EMAIL (optionnel),
//      NOTIFY_SECRET, BLOG_PUBLISH_SECRET, GITHUB_TOKEN,
//      GITHUB_REPO (ecospheare-cloud/blog), GITHUB_BRANCH (claude/gifted-rubin-9aowu6)
// 4. Settings → Triggers → autorise le domaine je-me-lance.fr en CORS
//    (ou laisse "*" pour commencer)
// 5. Copie l'URL du Worker (ex: https://subscribe.tonpseudo.workers.dev)
//    et mets-la dans la variable NEXT_PUBLIC_SUBSCRIBE_WORKER_URL
//    du repo GitHub (Settings → Secrets and variables → Actions → Variables)

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-notify-secret",
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);

    if (url.pathname === "/debug-audiences") {
      return handleDebugAudiences(env);
    }
    if (url.pathname === "/notify") {
      return handleNotify(request, env);
    }
    if (url.pathname === "/publish") {
      return handlePublish(request, env);
    }
    return handleSubscribe(request, env);
  },
};

async function handleDebugAudiences(env) {
  const res = await fetch("https://api.resend.com/audiences", {
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}` },
  });
  const data = await res.json();
  return json(data, res.status);
}

async function handleSubscribe(request, env) {
  const { email } = await request.json();

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return json({ error: "Email invalide" }, 400);
  }

  const FROM_EMAIL = env.RESEND_FROM_EMAIL || "je-me-lance.fr <onboarding@resend.dev>";

  const contactRes = await fetch(
    `https://api.resend.com/audiences/${env.RESEND_AUDIENCE_ID}/contacts`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, unsubscribed: false }),
    }
  );

  if (!contactRes.ok) {
    return json({ error: "Inscription impossible" }, 502);
  }

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: email,
      subject: "Merci pour ton inscription ! 🎉",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
          <h2 style="color:#16A34A;">Bienvenue sur je-me-lance.fr 👋</h2>
          <p>Merci pour ton inscription ! Tu recevras désormais un email chaque fois qu'un nouvel article est publié.</p>
          <p><a href="https://je-me-lance.fr/blog" style="color:#22C55E; font-weight:bold;">Voir tous les articles →</a></p>
          <p style="color:#94A3B8; font-size:12px; margin-top:32px;">Tu peux te désinscrire à tout moment.</p>
        </div>
      `,
    }),
  });

  return json({ success: true });
}

async function handleNotify(request, env) {
  const secret = request.headers.get("x-notify-secret");
  if (!env.NOTIFY_SECRET || secret !== env.NOTIFY_SECRET) {
    return json({ error: "Non autorisé" }, 401);
  }

  const { title, slug, excerpt } = await request.json();
  if (!title || !slug) {
    return json({ error: "title et slug requis" }, 400);
  }

  const FROM_EMAIL = env.RESEND_FROM_EMAIL || "je-me-lance.fr <onboarding@resend.dev>";

  const broadcastRes = await fetch("https://api.resend.com/broadcasts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      audienceId: env.RESEND_AUDIENCE_ID,
      from: FROM_EMAIL,
      subject: `Nouvel article : ${title}`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
          <h2 style="color:#16A34A;">Nouvel article sur je-me-lance.fr 📝</h2>
          <h3>${title}</h3>
          <p>${excerpt || ""}</p>
          <p><a href="https://je-me-lance.fr/blog/${slug}" style="color:#22C55E; font-weight:bold;">Lire l'article →</a></p>
        </div>
      `,
    }),
  });

  if (!broadcastRes.ok) {
    return json({ error: "Échec création broadcast" }, 502);
  }

  const broadcast = await broadcastRes.json();

  const sendRes = await fetch(`https://api.resend.com/broadcasts/${broadcast.id}/send`, {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}` },
  });

  if (!sendRes.ok) {
    return json({ error: "Échec envoi broadcast" }, 502);
  }

  return json({ success: true });
}

async function handlePublish(request, env) {
  const secret = request.headers.get("x-blog-secret");
  if (!env.BLOG_PUBLISH_SECRET || secret !== env.BLOG_PUBLISH_SECRET) {
    return json({ error: "Non autorisé" }, 401);
  }
  if (!env.GITHUB_TOKEN) {
    return json({ error: "Publication non configurée (GITHUB_TOKEN manquant)" }, 500);
  }

  const { title, content, slug, category, excerpt } = await request.json();
  if (!title || !content || !slug) {
    return json({ error: "title, content et slug requis" }, 400);
  }

  const repo = env.GITHUB_REPO || "ecospheare-cloud/blog";
  const branch = env.GITHUB_BRANCH || "claude/gifted-rubin-9aowu6";
  const path = "src/data/posts.json";
  const ghHeaders = {
    Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  };

  const currentFileRes = await fetch(
    `https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`,
    { headers: ghHeaders }
  );
  if (!currentFileRes.ok) {
    return json({ error: "Impossible de lire posts.json sur GitHub" }, 502);
  }
  const currentFile = await currentFileRes.json();
  const posts = JSON.parse(atob(currentFile.content));

  if (posts.some((p) => p.slug === slug)) {
    return json({ error: `Un article avec le slug "${slug}" existe déjà` }, 409);
  }

  const text = String(content).replace(/\s+/g, " ").trim();
  const newPost = {
    slug,
    category: category || "Article",
    title,
    excerpt: excerpt || (text.length > 180 ? `${text.slice(0, 177)}...` : text),
    date: new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
    content: String(content).split(/\n{2,}/).map((p) => p.trim()).filter(Boolean),
  };

  const updatedPosts = [newPost, ...posts];
  const fileContent = JSON.stringify(updatedPosts, null, 2) + "\n";

  const commitRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
    method: "PUT",
    headers: ghHeaders,
    body: JSON.stringify({
      message: `Publish: ${title}`,
      content: btoa(unescape(encodeURIComponent(fileContent))),
      sha: currentFile.sha,
      branch,
    }),
  });

  if (!commitRes.ok) {
    return json({ error: "Échec de la publication sur GitHub" }, 502);
  }

  return json({ success: true, slug, url: `/blog/${slug}` });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}
