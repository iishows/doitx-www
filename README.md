# doitx-www

The Doitx marketing site: an Astro static site (Chinese by default, English under `/en/`) plus a lightweight Node server that serves the build and redirects `/api/download` to the newest desktop installer.

## Layout

- `src/` — Astro pages, components, content collections, and i18n copy
- `docs/` — product docs rendered at `/docs/` at build time
- `public/` — static assets (graphics, OG images, fonts)
- `api/` — Vercel edge function for desktop downloads
- `infra/www/` — Dockerfile, static `server.mjs`, and redirects
- `packages/` — source-shared workspace packages used by the site
  - `core`, `ui-web`, `ui-tokens`, `contracts`

The four packages are mirrored from the Doitx product monorepo. They export raw TypeScript from `src/`; Vite inlines them at build time, so there is no separate build step.

## Develop

```bash
pnpm install
pnpm dev        # http://127.0.0.1:4321
pnpm check      # astro check
pnpm build      # static output in dist/
```

## Container

```bash
docker build -f infra/www/Dockerfile -t doitx-www:local .
docker run --rm -p 8080:80 doitx-www:local
```

CI (`.github/workflows/ci.yml`) type-checks and builds every push/PR, and publishes `ghcr.io/<repo>` on `main`.

## Keeping packages in sync

When `core` / `ui-web` / `ui-tokens` / `contracts` change in the product monorepo, copy the updated `src/` and `package.json` into the matching `packages/` directory here and rebuild.
