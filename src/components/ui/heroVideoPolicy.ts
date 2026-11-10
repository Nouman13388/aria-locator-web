export function shouldLoadHeroVideo({
  width,
  reducedMotion,
  saveData,
}: {
  width: number;
  reducedMotion: boolean;
  saveData: boolean;
}) {
  return width > 640 && !reducedMotion && !saveData;
}
