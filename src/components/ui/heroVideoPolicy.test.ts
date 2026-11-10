import { test } from "node:test";
import assert from "node:assert/strict";
import { shouldLoadHeroVideo } from "./heroVideoPolicy";
test("hero video loads only for larger viewports without motion/data restrictions", () => {
  for (const width of [390, 640, 641, 768, 1440])
    for (const reducedMotion of [true, false])
      for (const saveData of [true, false])
        assert.equal(
          shouldLoadHeroVideo({ width, reducedMotion, saveData }),
          width > 640 && !reducedMotion && !saveData,
        );
});
