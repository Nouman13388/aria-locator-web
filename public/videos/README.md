# Kee Nest hero media

Source: the user-supplied master, moved from the repository root to ignored `design/media/hero-original.mp4`. Both public video renditions are silent, 24fps, approximately ten seconds, and below 3 MB.

- `hero.mp4`: H.264, 1920 × 1080, CRF 28, veryfast, faststart.
- `hero.webm`: VP9, 1280 × 720, CRF 36, zero target bitrate. Keeping the source width avoids an unnecessary upscale and keeps the file below the size limit.
- `poster.jpg`: frame zero, 1280 × 720, optimized progressive JPEG, retained as the video/fallback poster.
- `poster.webp`: 1280 × 720 frame-zero image for supporting desktop browsers.
- `poster-mobile.webp`: 960 × 540 image selected at ≤640px. The poster is the high-priority LCP image.

Small viewports, reduced motion, and Save-Data use only the poster; video sources are not mounted or requested. Playback controls are visible and keyboard accessible on eligible viewports. No audio player is enabled.
