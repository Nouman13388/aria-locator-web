import { test } from "node:test";
import assert from "node:assert/strict";
import { CITIES, exploreSearchSchema } from "./cities";
import { listings, sampleHomesForCity } from "./listings";
test("demo city slugs are unique and city content is complete", () => {
  assert.equal(new Set(CITIES.map((city) => city.slug)).size, CITIES.length);
  for (const city of CITIES) assert.ok(city.name && city.blurb);
});
test("Explore search accepts only registry city slugs or no city", () => {
  assert.deepEqual(exploreSearchSchema.parse({}), {});
  for (const city of CITIES)
    assert.deepEqual(exploreSearchSchema.parse({ city: city.slug }), {
      city: city.slug,
    });
  for (const city of ["unknown", "", "Houston", null, 1, [CITIES[0].slug]])
    assert.equal(exploreSearchSchema.safeParse({ city }).success, false);
});
test("sample city groups contain only their assigned fictional homes", () => {
  for (const city of CITIES) {
    const samples = sampleHomesForCity(city.slug);
    assert.ok(samples.length > 0);
    assert.deepEqual(
      samples,
      listings.filter((listing) => listing.city === city.slug),
    );
  }
  assert.equal(sampleHomesForCity().length, 3);
});
