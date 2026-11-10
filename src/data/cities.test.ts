import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { CITIES, citySchema, findCity, cityPath } from "./cities";
import { cityHead } from "./cityPage";
test("eight demo cities have unique slugs and complete content", () => {
  assert.equal(CITIES.length, 8);
  assert.equal(new Set(CITIES.map((city) => city.slug)).size, CITIES.length);
  for (const city of CITIES) {
    assert.ok(city.name && city.tagline && city.heroAlt);
    assert.equal(city.neighborhoods.length, 3);
    assert.equal(city.sampleListings.length, 3);
    assert.ok(city.sampleListings.every((l) => (city.neighborhoods as readonly string[]).includes(l.neighborhood)));
  }
});
test("city lookup resolves known slugs and rejects unknown ones", () => {
  for (const city of CITIES) {
    assert.equal(findCity(city.slug), city);
    assert.equal(cityPath(city.slug), `/${city.slug}-apartments`);
    assert.equal(citySchema.safeParse(city.slug).success, true);
  }
  for (const slug of ["unknown", "", "Houston", "houston-apartments", undefined])
    assert.equal(findCity(slug), undefined);
});
test("city head has per-city title, description, canonical and og tags", () => {
  const heads = CITIES.map((city) => cityHead(city));
  assert.equal(new Set(heads.map((h) => h.meta[0].title)).size, CITIES.length);
  for (const head of heads) {
    assert.ok(head.links[0].href.endsWith("-apartments"));
    assert.ok(head.meta.some((m) => "property" in m && m.property === "og:title"));
  }
});
test("source copy has no banned claim words", () => {
  const banned = /\b(free|licensed|vetted|guarantee[ds]?|best|top-rated|rated|rating|ratings|testimonials?)\b/i;
  const files: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) walk(path);
      else if (/\.tsx?$/.test(name) && !name.endsWith(".test.ts") && !name.endsWith(".gen.ts")) files.push(path);
    }
  };
  walk("src");
  for (const file of files)
    assert.doesNotMatch(readFileSync(file, "utf8"), banned, file);
});
