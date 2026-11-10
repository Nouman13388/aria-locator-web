// Browser QA for the listing modal. Needs Playwright (`npm i --no-save playwright`).
// Usage: BASE=http://localhost:5173 CHROME=/path/to/chrome OUT=qa node scripts/qa-listing-modal.mjs
import { chromium } from "playwright";
import assert from "node:assert/strict";
const base = process.env.BASE ?? "http://localhost:5173";
const browser = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
const url = `${base}/houston-apartments/listings`;
const results = [];
for (const theme of ["grey-white", "fresh-teal", "navy-sun"])
  for (const width of [1440, 1190, 894, 390]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, permissions: ["clipboard-read", "clipboard-write"] });
    await ctx.addInitScript((t) => localStorage.setItem("keenest-theme", t), theme);
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => ["error", "warning"].includes(m.type()) && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.goto(url, { waitUntil: "networkidle" });
    await page.evaluate(() => scrollTo(0, 500));
    const card = page.locator(".city-card-body h3 a").nth(1);
    await card.scrollIntoViewIfNeeded();
    const y0 = await page.evaluate(() => scrollY);
    await card.click();
    const dialog = page.locator("dialog.listing-modal");
    await dialog.waitFor();
    assert.match(page.url(), /[?&]listing=houston-\d\d/, "url has listing");
    assert.equal(await dialog.getAttribute("aria-modal"), "true");
    const label = await dialog.getAttribute("aria-labelledby");
    assert.ok((await page.locator(`#${label}`).textContent()).includes("Houston"), "labelled by heading");
    assert.ok(await page.evaluate(() => document.activeElement?.classList.contains("modal-back")), "initial focus on close button");
    assert.equal(await page.evaluate(() => getComputedStyle(document.body).overflow), "hidden", "body scroll locked");
    // Focus trap: Tab never leaves the dialog.
    for (let i = 0; i < 40; i++) {
      await page.keyboard.press("Tab");
      assert.ok(await page.evaluate(() => !!document.activeElement?.closest("dialog")), "tab stays in dialog");
    }
    await page.waitForTimeout(300); // let the open animation settle
    // Layout facts.
    const f = await page.evaluate(() => {
      const panel = document.querySelector(".listing-modal-panel").getBoundingClientRect();
      const aside = getComputedStyle(document.querySelector(".ld-aside")).position;
      const sheet = document.querySelector(".listing-modal-panel");
      return { panel: panel.width / innerWidth, aside, scrolls: sheet.scrollHeight > sheet.clientHeight, overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth };
    });
    assert.ok(!f.overflow, "no horizontal overflow");
    assert.ok(f.scrolls, "modal scrolls internally");
    if (width >= 768) { assert.equal(f.aside, "sticky"); assert.ok(f.panel <= 0.76 || width * f.panel <= 1101, "panel ~75% / max 1100"); }
    else { assert.equal(f.aside, "static"); assert.ok(f.panel > 0.99, "full-screen sheet"); }
    // Gallery: arrow keys + counter.
    await page.locator(".ld-gallery").focus();
    await page.keyboard.press("ArrowRight");
    assert.equal((await page.locator(".ld-counter").textContent()).trim(), "2 / 3");
    // Copy link.
    await page.locator(".ld-copy").click();
    await page.waitForFunction(() => document.querySelector(".ld-main .toast")?.textContent === "Link copied");
    assert.match(await page.evaluate(() => navigator.clipboard.readText()), /\/houston-apartment\/houston-\d\d$/);
    // Form: errors then demo success.
    await page.getByRole("button", { name: "Submit" }).click();
    assert.ok(await page.locator(".pill-form .error").count() >= 3, "inline errors");
    await page.fill("#inq-firstName", "Sam"); await page.fill("#inq-lastName", "Renter");
    await page.fill("#inq-email", "sam@example.com"); await page.fill("#inq-message", "Is this sample still around?");
    assert.equal(await page.getByLabel(/follow-up/).isChecked(), false, "consent unchecked");
    await page.getByRole("button", { name: "Submit" }).click();
    assert.ok(await page.locator("#inq-success").isVisible(), "demo success");
    if (width === 1440 || width === 390) await page.screenshot({ path: `${process.env.OUT ?? "."}/modal-${theme}-${width}.jpg`, type: "jpeg", quality: 60 });
    // Esc closes, focus returns to the card link, scroll preserved, URL clean.
    await page.keyboard.press("Escape");
    await dialog.waitFor({ state: "detached" });
    assert.ok(!page.url().includes("listing="), "url cleaned");
    assert.ok(await page.evaluate(() => document.activeElement?.textContent === document.querySelectorAll(".city-card-body h3 a")[1].textContent), "focus returns to card");
    assert.ok(Math.abs((await page.evaluate(() => scrollY)) - y0) < 4, "scroll preserved");
    assert.notEqual(await page.evaluate(() => getComputedStyle(document.body).overflow), "hidden", "scroll unlocked");
    // Back closes; backdrop click closes.
    await card.click(); await dialog.waitFor();
    await page.goBack(); await dialog.waitFor({ state: "detached" });
    await card.click(); await dialog.waitFor();
    if (width >= 894) { await page.mouse.click(5, 450); await dialog.waitFor({ state: "detached" }); }
    // Direct links: valid opens, invalid is dropped.
    await page.goto(`${url}?listing=houston-03`, { waitUntil: "networkidle" });
    await page.locator("dialog.listing-modal").waitFor();
    await page.keyboard.press("Escape");
    await page.waitForFunction(() => !location.search.includes("listing"));
    await page.goto(`${url}?listing=bogus`, { waitUntil: "networkidle" });
    assert.equal(await page.locator("dialog.listing-modal").count(), 0);
    await page.goto(`${url}?listing=dallas-03`, { waitUntil: "networkidle" });
    await page.waitForFunction(() => !location.search.includes("listing"));
    assert.deepEqual(errors, [], `console: ${errors}`);
    results.push(`${theme} ${width}`);
    await ctx.close();
  }
console.log("PASS", results.length, "combinations");
await browser.close();
