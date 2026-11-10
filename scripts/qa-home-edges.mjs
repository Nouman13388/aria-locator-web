// Browser QA for Home. Needs Playwright (not a project dependency): `npm i --no-save playwright`.
// Usage: BASE=http://localhost:5173 CHROME=/path/to/chrome OUT=qa node scripts/qa-home-edges.mjs
import { chromium } from "playwright";
const base = process.env.BASE ?? "http://localhost:5173";
const browser = await chromium.launch(
  process.env.CHROME ? { executablePath: process.env.CHROME } : {},
);
const failures = [];
const rows = [];
for (const theme of ["grey-white", "fresh-teal", "navy-sun"])
  for (const width of [1440, 1190, 894, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    await context.addInitScript((t) => localStorage.setItem("keenest-theme", t), theme);
    const page = await context.newPage();
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.goto(base + "/", { waitUntil: "networkidle" });
    const r = await page.evaluate(() => {
      const box = (s) => {
        const b = document.querySelector(s).getBoundingClientRect();
        return { left: Math.round(b.left * 10) / 10, right: Math.round(b.right * 10) / 10 };
      };
      const ann = document.querySelector(".announcement");
      return {
        header: box(".site-header"),
        hero: box(".home-hero"),
        feature: box(".feature-card"),
        footer: box(".site-footer"),
        scroll: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth,
        announcement: ann && ann.getBoundingClientRect().height,
        h1: getComputedStyle(document.querySelector(".landing-hero-copy h1")).fontSize,
        pills: [".site-header .city-trigger", ".landing-hero-copy .city-trigger"].map((s) => {
          const e = document.querySelector(s).getBoundingClientRect();
          return [Math.round(e.width), Math.round(e.height)];
        }),
      };
    });
    const bad = [];
    if (r.header.left !== r.hero.left || r.header.right !== r.hero.right) bad.push("header/hero edges differ");
    if (r.footer.left !== r.hero.left || r.footer.right !== r.hero.right) bad.push("footer edges differ");
    if (r.scroll > r.client) bad.push("horizontal overflow");
    if (!r.announcement) bad.push("announcement hidden");
    if (errors.length) bad.push("console errors: " + errors.join(" | "));
    if (bad.length) failures.push({ theme, width, bad });
    rows.push({ theme, width, ...r });
    if (process.env.OUT) {
      await page.screenshot({ path: `${process.env.OUT}/home-${theme}-${width}.jpg`, type: "jpeg", quality: 60 });
      if (theme === "grey-white") await page.screenshot({ path: `${process.env.OUT}/home-full-${width}.jpg`, type: "jpeg", quality: 55, fullPage: true });
    }
    await context.close();
  }
console.log(JSON.stringify(rows));
await browser.close();
if (failures.length) {
  console.error("FAIL", JSON.stringify(failures, null, 1));
  process.exit(1);
}
console.log("PASS");
