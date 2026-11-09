import { test } from "node:test";
import assert from "node:assert/strict";
import { runInNewContext } from "node:vm";
import { themes, defaultTheme, resolveTheme } from "./themes";
import { themeScript } from "./headScript";
test("registry defines six unique, always available themes with two swatches", () => {
  assert.equal(themes.length, 6);
  assert.equal(new Set(themes.map((theme) => theme.id)).size, themes.length);
  for (const theme of themes) {
    assert.equal(theme.swatch.length, 2);
    assert.equal(resolveTheme(theme.id), theme.id);
  }
});
test("missing and unknown stored themes resolve to the default", () => {
  for (const value of [undefined, null, "", "unknown", {}, "__proto__"])
    assert.equal(resolveTheme(value), defaultTheme);
});
function bootstrap(value: string | null, search = "", blocked = false) {
  const dataset: Record<string, string> = {};
  runInNewContext(themeScript, {
    location: { search },
    document: { documentElement: { dataset } },
    localStorage: {
      getItem: (key: string) => {
        assert.equal(key, "keenest-theme");
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
