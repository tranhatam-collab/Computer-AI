# ============================================================
# COMPUTER.IAI.ONE — API Dockerfile
# Phase 1: Local dev + ECS/Hetzner deploy
# ============================================================

FROM node:20-alpine AS base

# Install pnpm
RUN npm install -g pnpm@9

WORKDIR /app

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/api/package.json apps/api/tsconfig.json ./apps/api/
COPY packages ./packages

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source
COPY apps/api/src ./apps/api/src

# Build
WORKDIR /app/apps/api
RUN pnpm build

# Production stage
FROM node:20-alpine AS production

RUN npm install -g pnpm@9
WORKDIR /app

COPY --from=base /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml /app/tsconfig.base.json ./
COPY --from=base /app/apps/api/package.json /app/apps/api/tsconfig.json ./apps/api/
COPY --from=base /app/packages ./packages
COPY --from=base /app/apps/api/dist ./apps/api/dist

RUN pnpm install --frozen-lockfile --prod

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (r) => r.statusCode === 200 ? process.exit(0) : process.exit(1))"

CMD ["node", "apps/api/dist/index.js"]
