import { test } from "node:test";
import assert from "node:assert/strict";
import { choose } from "./store";
test("rapid theme choices apply only the latest loaded font and theme", async () => {
  const keys = ["document", "window", "localStorage"] as const;
  const originals = keys.map((key) =>
    Object.getOwnPropertyDescriptor(globalThis, key),
  );
  const resolvers = new Map<string, () => void>();
  const dataset: Record<string, string> = { theme: "clean-grey" };
  const saved: string[][] = [];
  let events = 0;
  try {
    Object.defineProperty(globalThis, "document", {
      configurable: true,
      value: {
        documentElement: { dataset },
        fonts: {
          load: (font: string) =>
            new Promise<void>((resolve) => resolvers.set(font, resolve)),
        },
      },
    });
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: { dispatchEvent: () => events++ },
    });
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: {
        setItem: (key: string, value: string) => saved.push([key, value]),
      },
    });
    const earlier = choose("fresh-teal");
    const latest = choose("navy-sun");
    resolvers.get('700 1em "Outfit Variable"')!();
    await latest;
    resolvers.get('700 1em "Plus Jakarta Sans Variable"')!();
    await earlier;
    assert.equal(dataset.theme, "navy-sun");
    assert.deepEqual(saved, [["aria-theme", "navy-sun"]]);
    assert.equal(events, 1);
  } finally {
    keys.forEach((key, index) => {
      const original = originals[index];
      if (original) Object.defineProperty(globalThis, key, original);
      else Reflect.deleteProperty(globalThis, key);
    });
  }
});
