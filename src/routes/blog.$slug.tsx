import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ResponsiveImage } from "../components/ui/ResponsiveImage";
import { listingImages } from "../data/listings";
import { postBySlug, postDate } from "../data/posts";
import { pageHead } from "../lib/head";
export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = postBySlug(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => (loaderData ? pageHead(loaderData.title, loaderData.excerpt) : {}),
  component: Article,
});
function Article() {
  const post = Route.useLoaderData();
  const meta = listingImages[post.image];
  return (
    <article className="wrap article">
      <Link to="/blog" className="inline-link">← All articles</Link>
      <span className="chip">{post.topic}</span>
      <h1>{post.title}</h1>
      <p className="detail-meta"><time dateTime={post.date}>{postDate(post.date)}</time> · Demo article</p>
      <ResponsiveImage name={post.image} alt="" width={meta.width} height={meta.height} loading="eager" sizes="(max-width: 900px) calc(100vw - 32px), 760px" />
      {post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </article>
  );
}
