import { test } from "node:test";
import assert from "node:assert/strict";
import { runInNewContext } from "node:vm";
import { themes, defaultTheme, resolveTheme } from "./themes";
import { themeScript } from "./headScript";

test("registry has unique ids, two core themes, and four extras", () => {
  assert.equal(new Set(themes.map((theme) => theme.id)).size, themes.length);
  assert.equal(themes.filter((theme) => !theme.extra).length, 2);
  assert.equal(themes.filter((theme) => theme.extra).length, 4);
  for (const theme of themes) assert.equal(theme.swatch.length, 2);
});
test("theme fallback rejects unknown ids and disabled extras", () => {
  for (const enabled of [false, true]) {
    for (const unknown of [undefined, null, "unknown", "", {}, "__proto__"])
      assert.equal(resolveTheme(unknown, enabled), defaultTheme);
    for (const core of themes.filter((theme) => !theme.extra))
      assert.equal(resolveTheme(core.id, enabled), core.id);
  }
  for (const extra of themes.filter((theme) => theme.extra)) {
    assert.equal(resolveTheme(extra.id, false), defaultTheme);
    assert.equal(resolveTheme(extra.id, true), extra.id);
  }
});
function bootstrap(
  search: string,
  initial: Record<string, string> = {},
  blocked = false,
) {
  const storage = new Map(Object.entries(initial));
  const dataset: Record<string, string> = {};
  runInNewContext(themeScript, {
    URLSearchParams,
    location: { search },
    document: { documentElement: { dataset } },
    localStorage: {
      getItem: (key: string) => {
        if (blocked) throw new Error("Unavailable");
        return storage.get(key) ?? null;
      },
      setItem: (key: string, value: string) => {
        if (blocked) throw new Error("Unavailable");
        storage.set(key, value);
      },
      removeItem: (key: string) => {
        if (blocked) throw new Error("Unavailable");
        storage.delete(key);
      },
    },
  });
  return { dataset, storage };
}
test("blocking script enables, persists, and disables extras before paint", () => {
  const extra = themes.find((theme) => theme.extra)!;
  const enabled = bootstrap("?themes=all", { "keenest-theme": extra.id });
  assert.equal(enabled.dataset.theme, extra.id);
  assert.equal(enabled.dataset.themes, "all");
  assert.equal(enabled.storage.get("keenest-themes-all"), "1");
  assert.equal(
    bootstrap("", Object.fromEntries(enabled.storage)).dataset.theme,
    extra.id,
  );
  const disabled = bootstrap(
    "?themes=off",
    Object.fromEntries(enabled.storage),
  );
  assert.equal(disabled.dataset.theme, defaultTheme);
  assert.equal(disabled.dataset.themes, undefined);
  assert.equal(disabled.storage.has("keenest-themes-all"), false);
});
test("blocking script handles unknown ids, disabled extras, and unavailable storage", () => {
  for (const theme of themes.filter((theme) => theme.extra))
    assert.equal(
      bootstrap("", { "keenest-theme": theme.id }).dataset.theme,
      defaultTheme,
    );
  assert.equal(
    bootstrap("?themes=all", { "keenest-theme": "unknown" }).dataset.theme,
    defaultTheme,
  );
  assert.equal(bootstrap("?themes=all", {}, true).dataset.themes, "all");
  assert.equal(bootstrap("?themes=off", {}, true).dataset.theme, defaultTheme);
});
