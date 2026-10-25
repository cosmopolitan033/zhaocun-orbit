# ORBIT — by zhaocun

Personal creative development / frontend showcase. An interactive concept, not a commercial client commission.

Live: https://zhaocun-orbit.netlify.app  
Portfolio: https://zhaocun-portfolio.netlify.app

## Run and build

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Deploy the contents of `dist/` to Netlify. The included `netlify.toml` also supports Git-connected deployment with `npm run build` and `dist`.

## Edit your content

- `src/content.js`: all main text, names, personal links and content data.
- `src/style.css`: layout, typography, colors and mobile presentation.
- `src/main.js`: interface behavior and rendering.
- `public/`: locally hosted assets and credits.

## Source and attribution

Camera timeline adapted from Cinematic 3D Scroll Experiences, JosephASG / Codrops (MIT). Planet, rings, layout and content are new code. No original image or GLB assets are reused.

Original source: https://github.com/JosephASG/codrops-cinematic-scroll-animations

All source credits are retained in `public/credits.html` and `public/licenses/`. The code license does not replace third-party photo, font or library licenses.

## Accessibility

Keyboard-accessible controls, visible focus states, mobile layouts and reduced-motion support. WebGL pages provide a fallback when graphics cannot initialize.

Upstream reference commit: `7a56d1fdc12058e3a955348a7a9f3387a2bf57da`.
