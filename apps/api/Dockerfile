# ============================================================
# COMPUTER.IAI.ONE — API Dockerfile
# Render production image
# ============================================================

FROM node:20-alpine AS deps

# Bump this to bust Render Docker layer cache when source changes.
# Changing the value invalidates all subsequent layers in this stage.
ARG CACHE_BUST=5
RUN echo "cache-bust:$CACHE_BUST"

RUN corepack enable && corepack prepare pnpm@9 --activate
WORKDIR /app

# Copy manifests first for deterministic dependency caching.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/api/package.json apps/api/tsconfig.json ./apps/api/
COPY packages ./packages

RUN pnpm install --frozen-lockfile

FROM deps AS builder
WORKDIR /app
COPY apps/api/src ./apps/api/src
COPY apps/api/scripts ./apps/api/scripts
RUN pnpm --filter ./apps/api build:production

FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=10000

COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json

EXPOSE 10000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT || 10000) + '/api/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "apps/api/dist/index.js"]
