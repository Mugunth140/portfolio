# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS deps
WORKDIR /app

ENV NPM_CONFIG_FUND=false \
	NPM_CONFIG_AUDIT=false \
	NPM_CONFIG_PROGRESS=false

COPY package*.json ./
RUN --mount=type=cache,id=portfolio-npm-cache,target=/root/.npm \
	npm ci --prefer-offline --no-audit --no-fund

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000
CMD ["npm", "run", "start"]
