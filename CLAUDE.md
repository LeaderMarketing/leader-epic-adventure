# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Vite dev server at http://127.0.0.1:5173
npm run build      # Production build → dist/
npm run preview    # Serve built dist/ at http://127.0.0.1:4173
python serve_wireframe.py   # Alternative static server for dist/ at :5173
```

No test runner or linter is configured.

## Deployment

Pushes to `main` auto-deploy to GitHub Pages via `.github/workflows/deploy.yml` (build → upload `dist/` artifact → `actions/deploy-pages@v4`). Live URL: https://leadermarketing.github.io/leader-epic-jetski/.

`vite.config.js` sets `base: '/leader-epic-jetski/'` because Pages serves the site under that subpath. If the repo is renamed or moved to a custom domain, update `base` to match — otherwise asset URLs in the built `dist/` will 404.

## Architecture

Single-page React promotional landing page built with Vite. No routing — the whole site is one scrollable page.

**Entry point:** `src/main.jsx` → `src/App.jsx` (monolithic, ~690 lines) → `src/styles.css`

Everything lives in `App.jsx`: all data arrays, every component, and the root `App` component. There are no separate component files.

**Key data in App.jsx:**
- `products` — 16 Ubiquiti product objects with `name`, `sku`, `category`, `image` (CDN URL), optional `modelUrl` (CDN `.glb`), `href` (partner buy link), `features[]`
- `entryWays` — 3 promo pathway cards (Breeze Connect, Ubiquiti, Leader Cloud)
- `breezeServices` — 3 Breeze Connect service cards
- `sponsors` — sponsor logo bar
- `categories` — drives the product filter tabs; `categoryIcons` maps category names to SVG imports
- `PROMO_END_DATE` — hardcoded to `2026-05-31T23:59:59+09:30`; drives the live `CountdownTimer` component

**3D viewer:** `ProductViewer` uses the `@google/model-viewer` web component (registered as a custom element via the bare import). The toggle cycles through `image` / `features` / `3d` modes; `3d` mode is only shown when `product.modelUrl` exists. View mode state is stored in `App` as `viewerModes` keyed by SKU.

**Animations:** Framer Motion throughout — `motion.div` wrappers, `AnimatePresence` for product card filter transitions, `containerVariants` / `cardVariants` for staggered section reveals.

**Assets:** `src/assets/` contains `logos/`, `icons/` (SVG category icons), `cards/` (section hero images), and `jetski-hero.png`. Product images and 3D models are served from `cdn.ecomm.ui.com`, not local.

**Enquiry form** at the bottom is a static placeholder — not wired to any backend.
