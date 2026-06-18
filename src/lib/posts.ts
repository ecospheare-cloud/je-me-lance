import postsData from "@/data/posts.json";

export type Post = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  content: string[];
};

export const posts: Post[] = postsData as Post[];

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}
