import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
const css = await readFile(
  new URL("../src/styles/app.css", import.meta.url),
  "utf8",
);
const background = css.match(/--hero:\s*(#[\da-fA-F]{6})/)[1];
const source = new URL("../logo.jpeg", import.meta.url);
const output = (name) => new URL(`../public/${name}`, import.meta.url);
// The wide source wordmark is too small in a browser tab; retain its clear K.
const letter = await sharp(source.pathname)
  .extract({ left: 133, top: 242, width: 27, height: 43 })
  .dilate(1)
  .resize(50, 50, { fit: "contain", background })
  .png()
  .toBuffer();
const tab = await sharp({
  create: { width: 64, height: 64, channels: 4, background },
})
  .composite([{ input: letter, gravity: "centre" }])
  .png()
  .toBuffer();
const sizes = [16, 32, 48];
const images = await Promise.all(
  sizes.map((size) => sharp(tab).resize(size, size).png().toBuffer()),
);
const header = Buffer.alloc(6 + 16 * images.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);
let offset = header.length;
images.forEach((png, index) => {
  const at = 6 + index * 16;
  header[at] = sizes[index];
  header[at + 1] = sizes[index];
  header.writeUInt16LE(1, at + 4);
  header.writeUInt16LE(32, at + 6);
  header.writeUInt32LE(png.length, at + 8);
  header.writeUInt32LE(offset, at + 12);
  offset += png.length;
});
await writeFile(output("favicon.ico"), Buffer.concat([header, ...images]));
await writeFile(output("favicon-32.png"), images[1]);
for (const [name, size] of [
  ["apple-touch-icon.png", 180],
  ["icon-192.png", 192],
  ["icon-512.png", 512],
])
  await sharp(source.pathname)
    .resize(size, size, { fit: "contain", background })
    .png()
    .toFile(output(name).pathname);
const wordmark = await sharp(source.pathname)
  .extract({ left: 115, top: 225, width: 290, height: 80 })
  .resize(850, 235, { fit: "contain", background })
  .png()
  .toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background } })
  .composite([{ input: wordmark, gravity: "centre" }])
  .jpeg({ quality: 90 })
  .toFile(output("og-image.jpg").pathname);
console.log("Generated client-logo icons and share image.");
