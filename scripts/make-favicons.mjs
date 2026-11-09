// One-off asset generation; requires Python 3 with Pillow (no app dependency).
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const result = spawnSync(
  "python3",
  [
    "-c",
    String.raw`
from pathlib import Path
from PIL import Image, ImageOps
import sys
root = Path(sys.argv[1])
source = Image.open(root / 'logo.jpeg').convert('RGB')
side = min(source.size)
square = ImageOps.fit(source, (side, side), method=Image.Resampling.LANCZOS, centering=(.5, .5))
output = root / 'public'
output.mkdir(exist_ok=True)
square.save(output / 'favicon.ico', format='ICO', sizes=[(16,16), (32,32), (48,48)])
for name, size in [('favicon-32.png',32), ('apple-touch-icon.png',180), ('icon-192.png',192), ('icon-512.png',512)]:
    square.resize((size,size), Image.Resampling.LANCZOS).save(output / name)
og = Image.new('RGB', (1200,630), '#707070')
logo = square.resize((630,630), Image.Resampling.LANCZOS)
og.paste(logo, ((1200-logo.width)//2, (630-logo.height)//2))
og.save(output / 'og-image.jpg', quality=90, optimize=True)
print('Generated ICO (16/32/48), PNG icons (32/180/192/512), and OG image (1200x630).')
`,
    root,
  ],
  { stdio: "inherit" },
);
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
