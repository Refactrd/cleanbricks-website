import type { Post } from "@/lib/journal";
import { BlogCard } from "./BlogCard";

export function BlogGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((p) => (
        <div key={p.slug} className="reveal">
          <BlogCard post={p} />
        </div>
      ))}
    </div>
  );
}
