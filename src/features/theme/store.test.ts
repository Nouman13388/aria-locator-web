import { test } from "node:test";
import assert from "node:assert/strict";
import { choose } from "./store";
test("theme choice is immediate, validated, persisted, and announced", () => {
  const keys = ["document", "window", "localStorage"] as const;
  const originals = keys.map((key) =>
    Object.getOwnPropertyDescriptor(globalThis, key),
  );
  const dataset: Record<string, string> = {};
  const saved: string[][] = [];
  let events = 0;
  try {
    Object.defineProperty(globalThis, "document", {
      configurable: true,
      value: { documentElement: { dataset } },
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
    choose("fresh-teal");
    assert.equal(dataset.theme, "fresh-teal");
    choose("navy-sun");
    assert.equal(dataset.theme, "navy-sun");
    choose("unknown");
    assert.equal(dataset.theme, "grey-white");
    assert.deepEqual(saved.at(-1), ["keenest-theme", "grey-white"]);
    assert.equal(events, 3);
  } finally {
    keys.forEach((key, index) => {
      const old = originals[index];
      if (old) Object.defineProperty(globalThis, key, old);
      else Reflect.deleteProperty(globalThis, key);
    });
  }
});
