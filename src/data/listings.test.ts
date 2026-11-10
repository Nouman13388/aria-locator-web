import { test } from "node:test";
import assert from "node:assert/strict";
import {
  listingSearchSchema,
  listings,
  listingImages,
  filterListings,
} from "./listings";
test("listing search defaults and rejects unknown filters safely", () => {
  assert.equal(listingSearchSchema.parse({ beds: 2 }).beds, "2");
  assert.deepEqual(listingSearchSchema.parse({}), {
    beds: "any",
    setting: "any",
  });
  assert.deepEqual(
    listingSearchSchema.parse({
      beds: "99",
      setting: "elsewhere",
      extra: true,
    }),
    { beds: "any", setting: "any" },
  );
});
test("listing filters combine layout and surroundings", () => {
  assert.equal(filterListings({ beds: "any", setting: "any" }).length, 9);
  assert.deepEqual(
    filterListings({ beds: "2", setting: "green" }).map((item) => item.id),
    ["sample-4"],
  );
  assert.equal(
    filterListings({ beds: "studio", setting: "connected" }).length,
    0,
  );
});
test("every fictional listing has a unique id and local image metadata", () => {
  assert.equal(new Set(listings.map((item) => item.id)).size, 9);
  for (const item of listings) {
    assert.equal(item.images.length, 3);
    for (const image of item.images) {
      assert.ok(listingImages[image]?.alt);
      assert.ok(listingImages[image]?.width > 0);
      assert.ok(listingImages[image]?.height > 0);
    }
  }
});
