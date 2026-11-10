import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { PageHero } from "../features/city/blocks";
import { Pagination } from "../components/ui/Pagination";
import { ResponsiveImage } from "../components/ui/ResponsiveImage";
import { CITIES } from "../data/cities";
import { listingImages } from "../data/listings";
import { posts, postDate, topics } from "../data/posts";
import { filterPosts, paginatePosts } from "../features/blog/filter";
import { pageHead } from "../lib/head";
export const Route = createFileRoute("/blog")({
  validateSearch: z.object({
    q: z.string().optional().catch(undefined),
    location: z.string().optional().catch(undefined),
    topic: z.string().optional().catch(undefined),
    page: z.coerce.number().int().min(1).optional().catch(undefined),
  }),
  head: () => pageHead("Blog", "Short, original demo articles about planning a move, neighborhoods and settling in."),
  component: Blog,
});
function Blog() {
  const raw = Route.useSearch();
  const search = { q: raw.q ?? "", location: raw.location ?? "", topic: raw.topic ?? "", page: raw.page ?? 1 };
  const navigate = useNavigate({ from: "/blog" });
  const clean = (v: typeof search) => ({ q: v.q || undefined, location: v.location || undefined, topic: v.topic || undefined, page: v.page > 1 ? v.page : undefined });
  const update = (patch: Partial<typeof search>) => navigate({ search: clean({ ...search, page: 1, ...patch }), resetScroll: false });
  const view = paginatePosts(filterPosts(posts, search), search.page);
  return (
    <>
      <PageHero eyebrow="Demo content" title="The Kee Nest blog">Original sample articles. Dates and details are placeholders.</PageHero>
      <section className="wrap city-section">
        <form className="search-card" role="search" onSubmit={(e) => e.preventDefault()}>
          <div className="search-fields">
            <div className="field">
              <label htmlFor="q">Search articles</label>
              <input id="q" type="search" value={search.q} onChange={(e) => update({ q: e.target.value })} />
            </div>
            <div className="field">
              <label htmlFor="location">Locations</label>
              <select id="location" value={search.location} onChange={(e) => update({ location: e.target.value })}>
                <option value="">All locations</option>
                <option value="general">General</option>
                {CITIES.map((city) => <option key={city.slug} value={city.slug}>{city.name}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="topic">Topics</label>
              <select id="topic" value={search.topic} onChange={(e) => update({ topic: e.target.value })}>
                <option value="">All topics</option>
                {topics.map((topic) => <option key={topic} value={topic}>{topic}</option>)}
              </select>
            </div>
          </div>
        </form>
        <p className="results-count" role="status">{view.total} {view.total === 1 ? "article" : "articles"}</p>
        {view.total === 0 ? (
          <div className="empty-state"><h3>No articles match.</h3><p>Try a different search or clear the filters.</p></div>
        ) : (
          <div className="city-cards">
            {view.items.map((post) => {
              const meta = listingImages[post.image];
              return (
                <article className="city-card post-card" key={post.slug}>
                  <ResponsiveImage name={post.image} alt="" width={meta.width} height={meta.height} />
                  <div className="city-card-body">
                    <span className="chip">{post.topic}</span>
                    <h2><Link to="/blog/$slug" params={{ slug: post.slug }}>{post.title}</Link></h2>
                    <time dateTime={post.date}>{postDate(post.date)}</time>
                    <p>{post.excerpt}</p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
        <Pagination page={view.page} pages={view.pages} onChange={(page) => navigate({ search: clean({ ...search, page }), resetScroll: true })} />
      </section>
    </>
  );
}
