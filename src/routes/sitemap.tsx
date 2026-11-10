import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "../features/city/blocks";
import { CITIES } from "../data/cities";
import { cityHome, cityHref, citySections, legalLinks } from "../data/cityLinks";
import { posts } from "../data/posts";
import { pageHead } from "../lib/head";
export const Route = createFileRoute("/sitemap")({
  head: () => pageHead("Sitemap", "Every page of this demo, including each sample city."),
  component: Sitemap,
});
function Sitemap() {
  return (
    <>
      <PageHero title="Sitemap">Every page of this demo, grouped by city.</PageHero>
      <section className="wrap city-section">
        <div className="sitemap-grid">
          {CITIES.map((city) => (
            <div key={city.slug}>
              <h2><Link to={cityHome(city.slug)}>{city.name}</Link></h2>
              <ul>
                {citySections.map((section) => (
                  <li key={section.key}><Link to={cityHref(city.slug, section.key)}>{section.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2>General</h2>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              {posts.map((post) => (
                <li key={post.slug}><Link to="/blog/$slug" params={{ slug: post.slug }}>{post.title}</Link></li>
              ))}
              {legalLinks.map((item) => (
                <li key={item.to}><Link to={item.to}>{item.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
