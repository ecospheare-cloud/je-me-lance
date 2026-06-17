import { MetadataRoute } from "next";
import { posts } from "@/lib/posts";

const siteUrl = "https://je-me-lance.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
  ];

  const postRoutes = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
