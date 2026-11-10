// Local brand asset generation with the system font and Python/Pillow.
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
const result = spawnSync(
  "python3",
  [
    "-c",
    String.raw`
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import re,sys
root=Path(sys.argv[1]); output=root/'public'
name=re.search(r'siteName = "([^"]+)"', (root/'src/data/site.ts').read_text()).group(1)
css=(root/'src/styles/app.css').read_text().split('@theme')[0]
primary=re.search(r'--primary: (#[\da-fA-F]+)',css).group(1)
white=re.search(r'--white: (#[\da-fA-F]+)',css).group(1)
font_path='/System/Library/Fonts/Supplemental/Arial Bold.ttf'
def centered(im,text,size):
 d=ImageDraw.Draw(im); font=ImageFont.truetype(font_path,size); box=d.textbbox((0,0),text,font=font)
 x=(im.width-(box[2]-box[0]))/2; y=(im.height-(box[3]-box[1]))/2-box[1]
 d.text((x,y),text,font=font,fill=white)
icon=Image.new('RGB',(512,512),primary);centered(icon,name[0].upper(),360)
icon.save(output/'favicon.ico',format='ICO',sizes=[(16,16),(32,32),(48,48)])
for filename,size in [('favicon-32.png',32),('apple-touch-icon.png',180),('icon-192.png',192),('icon-512.png',512)]:
 icon.resize((size,size),Image.Resampling.LANCZOS).save(output/filename)
og=Image.new('RGB',(1200,630),primary);centered(og,name.upper()+' ◆',150);og.save(output/'og-image.jpg',quality=90,optimize=True)
print('Generated Aria monogram icons and original wordmark share image.')
`,
    fileURLToPath(new URL("../", import.meta.url)),
  ],
  { stdio: "inherit" },
);
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
