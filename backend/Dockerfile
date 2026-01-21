# ---------------- BUILD STAGE ----------------
    FROM node:20-alpine AS builder

    WORKDIR /app
    
    # Enable pnpm
    RUN corepack enable
    
    # Copy dependency files
    COPY package.json pnpm-lock.yaml ./
    
    # Deterministic install
    RUN pnpm install --frozen-lockfile
    
    # Copy source
    COPY . .
    
    # Build NestJS app
    RUN pnpm run build
    
    
    # ---------------- RUNTIME STAGE ----------------
    FROM node:20-alpine
    
    WORKDIR /app
    ENV NODE_ENV=production
    
    RUN corepack enable
    RUN addgroup -S app && adduser -S app -G app
    
    COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
    RUN pnpm install --prod --frozen-lockfile
    
    COPY --from=builder /app/dist ./dist
    
    USER app
    EXPOSE 3001
    
    CMD ["node", "dist/main.js"]
    