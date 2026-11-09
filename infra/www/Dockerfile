# 纯静态 marketing 镜像：Astro 站点（含 /docs）+ 自带轻量静态服务器。
# 独立仓库 doitx-www，不依赖后端 monorepo，也不依赖 Postgres/compose 网络。
#
# 构建:
#   docker build -f infra/www/Dockerfile -t doitx-www:local .
# 启动:
#   docker run --rm -p 8080:80 doitx-www:local
#   curl http://localhost:8080/
#   curl 'http://localhost:8080/api/download?platform=windows'
#
# /api/download 在线时调 GitHub API 取最新 release；不可达时用构建时写死的
# FALLBACK_RELEASE_URL 兜底。
#
# 依赖说明：站点通过 pnpm workspace 引用 packages/core、packages/ui-web、
# packages/ui-tokens、packages/contracts（exports 直接指 src/*.ts，vite 内联编译 TS，
# 无需单独 build）。构建上下文必须包含这些包的 manifest 与源码；安装全量依赖
# （含 devDeps）以便 astro/vite/tailwind 在容器内可解析。

ARG NODE_IMAGE=node:24.22.1-bookworm@sha256:6449e19d8184d84062525b6a7524def03146c2cb04a7f08b076680d0e8e4240a
FROM ${NODE_IMAGE}
ENV COREPACK_HOME=/usr/local/share/corepack \
    NPM_CONFIG_UPDATE_NOTIFIER=0 \
    NPM_CONFIG_PROGRESS=false \
    NODE_ENV=production
RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && corepack enable
WORKDIR /app

# 根 lockfile + workspace manifest（缓存键：任一 manifest 变更即重跑 install）。
# .npmrc 必须随 lockfile 进入，frozen-lockfile 校验会读其中的 pnpm 配置。
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json .npmrc ./

# 先拷 workspace 包源码再 install：pnpm 的 workspace 链接把包指回源码目录，
# install 后 node_modules 指向 /app/packages/*，必须保证这些目录在 install 前就位。
COPY packages/core/package.json ./packages/core/package.json
COPY packages/ui-web/package.json ./packages/ui-web/package.json
COPY packages/ui-tokens/package.json ./packages/ui-tokens/package.json
COPY packages/contracts/package.json ./packages/contracts/package.json
COPY packages/core/src/ ./packages/core/src/
COPY packages/ui-web/src/ ./packages/ui-web/src/
COPY packages/ui-tokens/src/ ./packages/ui-tokens/src/
COPY packages/contracts/src/ ./packages/contracts/src/

# 安装全量依赖（含 devDeps：构建需要 @tailwindcss/vite 等）
RUN pnpm install --frozen-lockfile --prod=false \
    && pnpm store prune \
    && chown -R node:node /app

# 站点源码（缓存键）
COPY src/ ./src/
COPY public/ ./public/
COPY api/ ./api/
COPY astro.config.mjs tsconfig.json www-port.mjs vercel.json middleware.ts ./

# 烘静态产物（含 /docs）。/docs 由 content loader 在构建期直接读仓库根 docs/。
COPY docs/ ./docs/
RUN pnpm build

# 运行层：静态产物 + 自定义静态服务器 + /api/download
COPY --chown=node:node infra/www/server.mjs ./server.mjs
COPY --chown=node:node infra/www/redirects.json ./redirects.json
# 下载按钮的离线兜底：烘构建期的 LATEST_RELEASE_URL，运行期可用 env 覆盖
ARG FALLBACK_RELEASE_URL=https://github.com/iishows/doitx/releases/latest
ENV FALLBACK_RELEASE_URL=${FALLBACK_RELEASE_URL}

EXPOSE 80
USER node
ENV WWW_ROOT=/app/dist
CMD ["node", "server.mjs"]
