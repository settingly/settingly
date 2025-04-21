ARG NODE_VERSION=20.14.0

################################################################################
# 1) BUILD STAGE
FROM node:${NODE_VERSION}-slim AS build

# pnpm global installieren
RUN npm install -g pnpm
WORKDIR /app

# deps installieren
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --shamefully-hoist

# Code kopieren & bauen
COPY . ./
RUN pnpm run build

################################################################################
# 2) PRODUCTION STAGE
FROM node:${NODE_VERSION}-slim AS prod

# pnpm wieder rein
RUN npm install -g pnpm
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0

# Root‑package.json & Lockfile für Prod‑Install kopieren
COPY package.json pnpm-lock.yaml ./

# Nur das gebaute Output rüberziehen
COPY --from=build /app/.output ./

# Prod‑Dependencies direkt ins server‑Verzeichnis installieren
RUN pnpm install --prod --shamefully-hoist --prefix server

EXPOSE 3000

CMD ["node", "server/index.mjs"]