FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm@latest-10

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM node:20-alpine AS runner

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

RUN npm install -g pnpm@latest-10

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder .next/standalone ./
COPY --from=builder .next/static ./.next/static
COPY --from=builder public ./public

USER nextjs

EXPOSE 3000

CMD HOSTNAME="0.0.0.0" node server.js
