import { NextRequest, NextResponse } from "next/server";
import postsData from "@/data/posts.json";
import type { Post } from "@/lib/posts";

const BLOG_PUBLISH_SECRET = process.env.BLOG_PUBLISH_SECRET;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || "ecospheare-cloud/blog";
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";
const POSTS_PATH = "src/data/posts.json";

function toExcerpt(content: string): string {
  const text = content.replace(/\s+/g, " ").trim();
  return text.length > 180 ? `${text.slice(0, 177)}...` : text;
}

function toParagraphs(content: string): string[] {
  return content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function todayFr(): string {
  return new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-blog-secret");
  if (!BLOG_PUBLISH_SECRET || secret !== BLOG_PUBLISH_SECRET) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  if (!GITHUB_TOKEN) {
    return NextResponse.json(
      { error: "Publication non configurée (GITHUB_TOKEN manquant)" },
      { status: 500 }
    );
  }

  const { title, content, slug, category, excerpt } = await req.json();
  if (!title || !content || !slug) {
    return NextResponse.json(
      { error: "title, content et slug requis" },
      { status: 400 }
    );
  }

  const posts = postsData as Post[];
  if (posts.some((p) => p.slug === slug)) {
    return NextResponse.json(
      { error: `Un article avec le slug "${slug}" existe déjà` },
      { status: 409 }
    );
  }

  const newPost: Post = {
    slug,
    category: category || "Article",
    title,
    excerpt: excerpt || toExcerpt(content),
    date: todayFr(),
    content: toParagraphs(content),
  };

  const updatedPosts = [newPost, ...posts];
  const fileContent = JSON.stringify(updatedPosts, null, 2) + "\n";

  const ghHeaders = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  };

  const currentFileRes = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${POSTS_PATH}?ref=${GITHUB_BRANCH}`,
    { headers: ghHeaders }
  );
  if (!currentFileRes.ok) {
    const details = await currentFileRes.text();
    return NextResponse.json(
      { error: "Impossible de lire posts.json sur GitHub", details },
      { status: 502 }
    );
  }
  const currentFile = await currentFileRes.json();

  const commitRes = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${POSTS_PATH}`,
    {
      method: "PUT",
      headers: ghHeaders,
      body: JSON.stringify({
        message: `Publish: ${title}`,
        content: Buffer.from(fileContent, "utf-8").toString("base64"),
        sha: currentFile.sha,
        branch: GITHUB_BRANCH,
      }),
    }
  );

  if (!commitRes.ok) {
    const details = await commitRes.text();
    return NextResponse.json(
      { error: "Échec de la publication sur GitHub", details },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true, slug, url: `/blog/${slug}` });
}
