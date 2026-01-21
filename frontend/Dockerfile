# ---------------- BUILD STAGE ----------------
    FROM node:20-alpine AS builder

    WORKDIR /app
    
    # Enable pnpm via corepack
    RUN corepack enable
    
    # Copy dependency files
    COPY package.json pnpm-lock.yaml ./
    
    # Deterministic install
    RUN pnpm install --frozen-lockfile
    
    # Copy source code
    COPY . .
    
    # Build Next.js app (standalone output)
    RUN pnpm run build
    
    
    # ---------------- RUNTIME STAGE ----------------
    FROM nginx:alpine
    
    # Remove default nginx config
    RUN rm /etc/nginx/conf.d/default.conf
    
    # Copy custom nginx config
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    # Copy Next.js standalone build
    COPY --from=builder /app/.next/standalone /app
    COPY --from=builder /app/.next/static /app/.next/static
    COPY --from=builder /app/public /app/public
    
    EXPOSE 80
    
    CMD ["nginx", "-g", "daemon off;"]
    