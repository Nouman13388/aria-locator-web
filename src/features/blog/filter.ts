import type { Post } from "../../data/posts";
export function filterPosts(posts: readonly Post[], f: { q: string; location: string; topic: string }) {
  const q = f.q.trim().toLowerCase();
  return posts.filter(
    (post) =>
      (!f.location || post.location === f.location) &&
      (!f.topic || post.topic === f.topic) &&
      (!q || `${post.title} ${post.excerpt}`.toLowerCase().includes(q)),
  );
}
export function paginatePosts<T>(items: readonly T[], page: number, size = 9) {
  const pages = Math.max(1, Math.ceil(items.length / size));
  const current = Math.min(Math.max(1, page), pages);
  return { items: items.slice((current - 1) * size, current * size), page: current, pages, total: items.length };
}
