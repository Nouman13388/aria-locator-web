import sharp from "sharp";
const assets = {
  exterior: "exterior-original.png",
  living: "living-original.png",
  kitchen: "kitchen-original.png",
  bedroom: "bedroom-original.png",
};
for (const [name, file] of Object.entries(assets)) {
  const source = new URL(`../design/media/${file}`, import.meta.url);
  const meta = await sharp(source.pathname).metadata();
  for (const width of [640, meta.width]) {
    const suffix = width === meta.width ? "" : `-${width}`;
    const base = new URL(
      `../public/images/keenest-${name}${suffix}`,
      import.meta.url,
    ).pathname;
    await sharp(source.pathname)
      .resize({ width })
      .webp({ quality: 80 })
      .toFile(base + ".webp");
    await sharp(source.pathname)
      .resize({ width })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(base + ".jpg");
  }
}
console.log("Generated responsive client-owned images and JPEG fallbacks.");
