import { test } from "node:test";
import assert from "node:assert/strict";
import { runInNewContext } from "node:vm";
import { themes, defaultTheme, resolveTheme } from "./themes";
import { themeScript } from "./headScript";
test("registry defines three unique, always available themes with two swatches", () => {
  assert.equal(themes.length, 3);
  assert.equal(new Set(themes.map((theme) => theme.id)).size, themes.length);
  for (const theme of themes) {
    assert.equal(theme.swatch.length, 2);
    assert.equal(resolveTheme(theme.id), theme.id);
  }
});
test("missing and unknown stored themes resolve to the default", () => {
  for (const value of [
    undefined,
    null,
    "",
    "unknown",
    "sage",
    "indigo",
    "clay",
    "blue",
    "client",
    "recommended",
    {},
    "__proto__",
  ])
    assert.equal(resolveTheme(value), defaultTheme);
});
function bootstrap(value: string | null, search = "", blocked = false) {
  const dataset: Record<string, string> = {};
  runInNewContext(themeScript, {
    location: { search },
    document: { documentElement: { dataset } },
    localStorage: {
      getItem: (key: string) => {
        assert.equal(key, "aria-theme");
        if (blocked) throw Error("Unavailable");
        return value;
      },
    },
  });
  return dataset;
}
test("blocking script accepts every registry id without a query flag", () => {
  for (const theme of themes)
    for (const search of ["", "?themes=off", "?themes=all"])
      assert.equal(bootstrap(theme.id, search).theme, theme.id);
});
test("blocking script falls back safely when storage is invalid or unavailable", () => {
  assert.equal(bootstrap("unknown").theme, defaultTheme);
  assert.equal(bootstrap(null).theme, defaultTheme);
  assert.equal(bootstrap(null, "", true).theme, defaultTheme);
});

test("semantic text and focus tokens meet AA contrast in each palette", async () => {
  const { readFile } = await import("node:fs/promises");
  const css = await readFile(
    new URL("../../styles/app.css", import.meta.url),
    "utf8",
  );
  function luminance(hex: string) {
    const channels = [1, 3, 5]
      .map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255)
      .map((value) =>
        value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
      );
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  }
  function contrast(a: string, b: string) {
    const [low, high] = [luminance(a), luminance(b)].sort((x, y) => x - y);
    return (high + 0.05) / (low + 0.05);
  }
  for (const theme of themes) {
    const block = css.match(
      new RegExp(`\\[data-theme="${theme.id}"\\]\\s*\\{([^}]+)`),
    )![1];
    const tokens = Object.fromEntries(
      [...block.matchAll(/--([\w-]+):\s*(#[\da-fA-F]{6})/g)].map((match) => [
        match[1],
        match[2],
      ]),
    );
    for (const surface of ["bg", "surface", "band"]) {
      for (const text of ["ink", "ink-2", "err", "ok"])
        assert.ok(
          contrast(tokens[text], tokens[surface]) >= 4.5,
          `${theme.id}: ${text} on ${surface}`,
        );
      assert.ok(
        contrast(tokens.focus, tokens[surface]) >= 3,
        `${theme.id}: focus on ${surface}`,
      );
    }
    assert.ok(
      contrast(tokens.primary, tokens["on-primary"]) >= 4.5,
      `${theme.id}: button text`,
    );
    assert.ok(
      contrast(tokens.hero, tokens.white) >= 4.5,
      `${theme.id}: CTA text`,
    );
  }
});
