import postsData from "@/data/posts.json";

export type QuizQuestion = {
  question: string;
  options: string[];
  correct: number;
};

export type Post = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  content: string[];
  image?: string;
  imageAlt?: string;
  quiz?: QuizQuestion[];
  keyPoints?: string[];
  metaTitle?: string;
};

export const posts: Post[] = postsData as Post[];

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}
