# VentureStress AI screenshot video

A 39.4-second, 1920×1080, 30 fps silent MP4 assembled from all eight supplied screenshots. Gentle motion and 0.6-second crossfades preserve the full screenshots. The loading scene is an edited still, not a measurement of actual response time.

Run inside `video/`:

```sh
npm ci
npm run dev -- --no-open --port=3001
npm run render
```

Output: `../media/venturestress-showcase.mp4` (H.264, yuv420p). The first render may download Chrome Headless Shell. Source screenshots are copied into `public/` so the composition is self-contained.

Edit scene timing in `src/Walkthrough.tsx`, layout in `src/scenes/ScreenshotScene.tsx`, and the ending in `src/scenes/Closing.tsx`. No narration or music is included. This is a screenshot walkthrough, not a continuous screen recording or evidence that a business experiment was conducted.
