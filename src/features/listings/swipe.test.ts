import { test } from "node:test";
import assert from "node:assert/strict";
import { swipeDirection } from "./swipe";
test("carousel swipe distinguishes horizontal intent from taps and vertical scrolling", () => {
  const start = { x: 100, y: 100 };
  assert.equal(swipeDirection(start, { x: 30, y: 105 }), 1);
  assert.equal(swipeDirection(start, { x: 180, y: 105 }), -1);
  assert.equal(swipeDirection(start, { x: 120, y: 100 }), 0);
  assert.equal(swipeDirection(start, { x: 140, y: 180 }), 0);
});
