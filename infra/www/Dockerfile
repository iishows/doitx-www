# Build + runtime for the doitx-www static marketing site + server.mjs
# (the server serves dist/, handles host-based redirects, and exposes /api/download).

FROM node:22-alpine AS build
WORKDIR /app

COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY packages/ ./packages/
# scripts/ may be referenced by package.json build
COPY scripts/ ./scripts/

RUN apk add --no-cache git && npm install -g pnpm@9 && pnpm install --frozen-lockfile

COPY astro.config.mjs tsconfig.json middleware.ts vercel.json ./
COPY src/ ./src/
COPY public/ ./public/
COPY api/ ./api/
COPY infra/www/redirects.json ./redirects.json

RUN pnpm run build

# ---- runtime image -------------------------------------------------------
FROM node:22-alpine AS runtime
WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/redirects.json ./redirects.json
COPY infra/www/server.mjs ./server.mjs

ENV PORT=80 \
    NODE_ENV=production

EXPOSE 80

CMD ["node", "server.mjs"]
