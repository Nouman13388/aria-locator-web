import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { CITIES, citySchema, findCity } from "./cities";
import { cityHref, citySections, legacyRedirects, listingHref } from "./cityLinks";
import { cityHead } from "./cityPage";
import { LISTINGS_PER_CITY, findListing, listingsForCity } from "./listings";
import { faqFor } from "./content";
import { posts, topics } from "./posts";
import { legacyTarget } from "../lib/legacy";
import { PAGE_SIZE, compactFilters, readFilters, filterListings, listingsSearchSchema, paginate, parseNeighborhoods } from "../features/listings/filters";
import { filterPosts, paginatePosts } from "../features/blog/filter";
test("eight demo cities have unique slugs, 8 neighborhoods and a gallery", () => {
  assert.equal(CITIES.length, 8);
  assert.equal(new Set(CITIES.map((city) => city.slug)).size, 8);
  for (const city of CITIES) {
    assert.ok(city.name && city.tagline && city.heroAlt);
    assert.equal(city.neighborhoods.length, 8);
    assert.equal(new Set(city.neighborhoods.map((a) => a.slug)).size, 8);
    assert.equal(city.gallery.length, 4);
  }
  assert.ok(new Set(CITIES.map((c) => c.gallery[0])).size > 1, "galleries differ between cities");
});
test("slug validation resolves known slugs and rejects unknown ones", () => {
  for (const city of CITIES) {
    assert.equal(findCity(city.slug), city);
    assert.equal(citySchema.safeParse(city.slug).success, true);
    assert.equal(cityHref(city.slug, "faq"), `/${city.slug}-apartments/faq`);
  }
  for (const slug of ["unknown", "", "Houston", "houston-apartments", undefined]) assert.equal(findCity(slug), undefined);
});
test("old global routes redirect to the scoped equivalent", () => {
  assert.equal(Object.keys(legacyRedirects).length, 9);
  for (const path of Object.keys(legacyRedirects) as (keyof typeof legacyRedirects)[]) {
    const target = legacyTarget(path, "dallas");
    assert.match(target, /^\/dallas-apartments\/[a-z-]+$/);
    assert.ok(citySections.some((s) => target.endsWith(`/${s.key}`)));
  }
  assert.equal(legacyTarget("/about", "plano"), "/plano-apartments/about-us");
  assert.equal(legacyTarget("/how-it-works", "plano"), "/plano-apartments/our-process");
  assert.equal(legacyTarget("/moving-concierge", "plano"), "/plano-apartments/concierge");
});
test("listing generator is deterministic with unique ids per city", () => {
  for (const city of CITIES) {
    const list = listingsForCity(city);
    assert.ok(list.length >= 18 && list.length === LISTINGS_PER_CITY);
    assert.equal(new Set(list.map((l) => l.id)).size, list.length);
    assert.ok(list.every((l) => l.id.startsWith(`${city.slug}-`) && l.images.length === 3));
    assert.ok(list.every((l) => city.neighborhoods.some((a) => a.slug === l.neighborhood)));
    assert.equal(findListing(city, list[3].id), list[3]);
    assert.equal(listingHref(city.slug, list[3].id), `/${city.slug}-apartment/${list[3].id}`);
  }
  assert.equal(findListing(CITIES[0], "nope"), undefined);
  assert.equal(findListing(CITIES[0], listingsForCity(CITIES[1])[0].id), undefined);
});
test("listing filters and pagination", () => {
  const city = CITIES[0];
  const all = listingsForCity(city);
  const none = { layout: "any" as const, featured: false, neighborhoods: [] as string[] };
  assert.equal(filterListings(all, none).length, all.length);
  const area = all[0].neighborhood;
  assert.ok(filterListings(all, { ...none, neighborhoods: [area] }).every((l) => l.neighborhood === area));
  assert.ok(filterListings(all, { ...none, featured: true }).every((l) => l.featured));
  assert.ok(filterListings(all, { ...none, layout: "2-2" }).every((l) => l.layout === "2-2"));
  assert.equal(filterListings(all, { ...none, neighborhoods: ["x"] }).length, 0);
  assert.deepEqual(parseNeighborhoods(`${area},bogus`, city.neighborhoods.map((a) => a.slug)), [area]);
  const page = paginate(all, 3);
  assert.equal(page.pages, Math.ceil(all.length / PAGE_SIZE));
  assert.equal(page.page, 3);
  assert.equal(paginate(all, 99).page, page.pages);
  assert.equal(paginate(all, -4).page, 1);
  assert.equal(paginate([], 1).pages, 1);
  assert.deepEqual(listingsSearchSchema.parse({}), {});
  assert.deepEqual(readFilters({}), { neighborhood: "", layout: "any", featured: false, page: 1 });
  assert.equal(listingsSearchSchema.parse({ layout: "bad", page: "x" }).page, undefined);
  assert.deepEqual(compactFilters(readFilters({ layout: "2-2", page: 1 })), { neighborhood: undefined, layout: "2-2", featured: undefined, page: undefined });
});
test("FAQ and blog data have the expected shape", () => {
  for (const city of CITIES) {
    const faq = faqFor(city);
    assert.equal(faq.length, 10);
    assert.equal(new Set(faq.map((f) => f.question)).size, 10);
    assert.ok(faq.every((f) => f.question.endsWith("?") && f.answer.length > 20));
  }
  assert.ok(faqFor(CITIES[0]).some((f) => f.answer.includes(CITIES[0].name)));
  assert.equal(posts.length, 6);
  assert.equal(new Set(posts.map((p) => p.slug)).size, 6);
  for (const post of posts) {
    assert.match(post.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(topics.includes(post.topic) && post.excerpt && post.body.length >= 3);
  }
  assert.equal(filterPosts(posts, { q: "", location: "", topic: "Pets" }).length, posts.filter((p) => p.topic === "Pets").length);
  assert.equal(filterPosts(posts, { q: "zzz", location: "", topic: "" }).length, 0);
  assert.equal(paginatePosts(posts, 1).pages, 1);
});
test("city head has per-city title, description, canonical and og tags", () => {
  const heads = CITIES.map((city) => cityHead(city));
  assert.equal(new Set(heads.map((h) => h.meta[0].title)).size, CITIES.length);
  for (const head of heads) {
    assert.ok(head.links[0].href.endsWith("-apartments"));
    assert.ok(head.meta.some((m) => "property" in m && m.property === "og:title"));
  }
});
test("source copy has no banned claim words or prices", () => {
  const banned = /\b(free|licensed|vetted|verified|guarantee[ds]?|best|top-rated|rated|ratings?|testimonials?|awards?|award-winning|5-star)\b/i;
  const files: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) walk(path);
      else if (/\.tsx?$/.test(name) && !name.endsWith(".test.ts") && !name.endsWith(".gen.ts")) files.push(path);
    }
  };
  walk("src");
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    assert.doesNotMatch(text, banned, file);
    if (file.startsWith("src/data/")) {
      assert.doesNotMatch(text, /\d\s?%/, `${file}: percentages`);
      assert.doesNotMatch(text, /\$\d/, `${file}: prices`);
    }
  }
});
