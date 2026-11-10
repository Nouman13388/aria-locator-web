type Point = { x: number; y: number };
export function swipeDirection(start: Point, end: Point) {
  const dx = end.x - start.x,
    dy = end.y - start.y;
  return Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy) * 1.2
    ? dx < 0
      ? 1
      : -1
    : 0;
}
