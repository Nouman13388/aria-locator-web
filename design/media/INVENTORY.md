# Kee Nest media inventory

The requested source folder was absent when the final brief arrived. The user confirmed reuse of the existing cleared sources. It now holds the supplied video master, supplied logo, and four original project image exports already cleared by the user for this demo. Original binaries are retained locally and ignored by Git; the inventory and optimized public renditions are tracked. No stock-site or reference-site imagery, icons, branding, or code is used.

| Original                              | Slot and web rendition                                                                                                             |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| hero-original.mp4                     | Inset photo/video hero in all themes; silent `public/videos/hero.mp4` and `hero.webm`; frame-zero JPEG and responsive WebP posters |
| logo-original.jpeg and root logo.jpeg | Text-wordmark styling source; generated favicon, touch icons, and share image                                                      |
| exterior-original.png                 | Home image circles, questionnaire surroundings image and last-resort hero poster fallback; `keenest-exterior` responsive images    |
| living-original.png                   | Home image circles, sample listing carousel on Explore, About, How It Works; `keenest-living` responsive images                    |
| kitchen-original.png                  | Home image circles, sample listing carousel and Contact; `keenest-kitchen` responsive images                                       |
| bedroom-original.png                  | Home image circles and sample listing carousel; `keenest-bedroom` responsive images                                                |

Process cards use the project's original geometric SVG icons. The footer uses the shared text wordmark derived from the logo; an extra footer photograph is not required. Every source image is used. No unused image/video asset remains; the master's audio track is deliberately unused and removed from both public video files. The optional audio player is omitted.

`node scripts/make-images.mjs` produces WebP and JPEG fallbacks at 224px, 640px, and original width. `node scripts/make-favicons.mjs` uses the pinned Sharp development tool and the root client logo. The small tab icon uses the logo's strengthened K so it remains legible at 16px; larger icons retain the full source wordmark.
