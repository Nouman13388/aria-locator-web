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
from PIL import Image, ImageOps, ImageFilter
import sys
root = Path(sys.argv[1])
source = Image.open(root / 'logo.jpeg').convert('RGB')
side = min(source.size)
square = ImageOps.fit(source, (side, side), method=Image.Resampling.LANCZOS, centering=(.5, .5))
output = root / 'public'
output.mkdir(exist_ok=True)
# The full wide wordmark becomes illegible at 16px. Extract its K for browser tabs.
gray = source.convert('L')
bright = gray.point(lambda value: 255 if value > 190 else 0)
left, top, right, bottom = bright.getbbox()
columns = [x for x in range(left, right) if bright.crop((x, top, x+1, bottom)).getbbox()]
end = columns[0]
for column in columns[1:]:
    if column - end > 6: break
    end = column
letter = gray.crop((left-3, top-3, end+4, bottom+3))
mask = letter.point(lambda value: max(0, min(255, round((value-112)*255/143))))
mask = mask.filter(ImageFilter.MaxFilter(3))
mask = ImageOps.contain(mask, (50,50), method=Image.Resampling.LANCZOS)
tab_icon = Image.new('RGB', (64,64), '#707070')
tab_icon.paste(Image.new('RGB', mask.size, 'white'), ((64-mask.width)//2, (64-mask.height)//2), mask)
tab_icon.save(output / 'favicon.ico', format='ICO', sizes=[(16,16), (32,32), (48,48)])
tab_icon.resize((32,32), Image.Resampling.LANCZOS).save(output / 'favicon-32.png')
for name, size in [('apple-touch-icon.png',180), ('icon-192.png',192), ('icon-512.png',512)]:
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
