# Hero media

The user supplied `video.mp4` at the repository root. The original 7.6 MB master is ignored, and is not committed. All public renditions are silent, 24fps, and approximately ten seconds long.

- `hero.mp4`: H.264, CRF 28, veryfast, 1920px wide, faststart, no audio.
- `hero.webm`: VP9, CRF 36, zero target bitrate, source width 1280px, no audio. Keeping the original width avoids an unnecessary upscale and reduces this rendition below 3 MB.
- `poster.jpg`: frame zero, 1280 × 720, optimized progressive JPEG.

Generated with ffmpeg and optimized locally. No third-party media was downloaded. Regenerate from the ignored master with the commands recorded in QA.md.
