import { test } from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { RouterProvider, createMemoryHistory, createRootRoute, createRouter } from "@tanstack/react-router";
import { CITIES } from "../../data/cities";
import { listingsForCity } from "../../data/listings";
import { listingsSearchSchema } from "./filters";
import { copyText } from "../../lib/clipboard";
import { validateInquiry, emptyInquiry } from "./inquirySchema";
import { ListingDetail } from "./ListingDetail";
import { PageShell } from "./ListingShells";
const city = CITIES[0];
const listing = listingsForCity(city)[2];
test("listing search param accepts known ids and drops unknown ones", () => {
  assert.equal(listingsSearchSchema.parse({ listing: listing.id }).listing, listing.id);
  for (const bad of ["nope", "", 5, null, `${listing.id}x`]) assert.equal(listingsSearchSchema.parse({ listing: bad }).listing, undefined);
});
test("copy link uses the clipboard and reports failures", async () => {
  const calls: string[] = [];
  assert.equal(await copyText({ writeText: async (t) => void calls.push(t) }, "https://x.test/a"), true);
  assert.deepEqual(calls, ["https://x.test/a"]);
  assert.equal(await copyText({ writeText: async () => { throw new Error("denied"); } }, "x"), false);
  assert.equal(await copyText(undefined, "x"), false);
});
test("inquiry form validates and needs no consent", () => {
  assert.deepEqual(Object.keys(validateInquiry(emptyInquiry)).sort(), ["email", "firstName", "lastName", "message"]);
  assert.deepEqual(validateInquiry({ ...emptyInquiry, firstName: "A", lastName: "B", email: "a@example.com", message: "Is this still around?" }), {});
});
async function render(shell: boolean) {
  const root = createRootRoute({
    component: () => {
      const detail = createElement(ListingDetail, { listing, cityName: city.name, heading: shell ? "h1" : "h2", headingId: "ld-title" });
      return shell ? createElement(PageShell, { city: city.slug, cityName: city.name }, detail) : detail;
    },
  });
  const router = createRouter({ routeTree: root, history: createMemoryHistory({ initialEntries: ["/"] }) });
  await router.load();
  return renderToString(createElement(RouterProvider, { router }));
}
test("ListingDetail renders in the page shell and as bare modal content", async () => {
  for (const page of [true, false]) {
    const html = await render(page);
    assert.match(html, /Sample listing/);
    assert.match(html, /Want more info on this listing\?/);
    assert.match(html, /Property Info/);
    assert.match(html, new RegExp(`<h${page ? 1 : 2}[^>]*id="ld-title"`));
    assert.doesNotMatch(html, /\$\d/);
    assert.equal(/Breadcrumb/.test(html), page);
  }
});
