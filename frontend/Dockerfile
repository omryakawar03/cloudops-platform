# ---------------- BUILD STAGE ----------------
    FROM node:20-alpine AS builder

    WORKDIR /app
    
    RUN corepack enable
    
    COPY package.json pnpm-lock.yaml ./
    RUN pnpm install --frozen-lockfile
    
    COPY . .
    
    RUN pnpm run build
    
    
    # ---------------- RUNTIME STAGE ----------------
    FROM node:20-alpine
    
    WORKDIR /app
    ENV NODE_ENV=production
    
    # Install nginx
    RUN apk add --no-cache nginx
    
    # Create nginx folders
    RUN mkdir -p /run/nginx
    
    # Copy nginx config
    COPY nginx.conf /etc/nginx/http.d/default.conf
    
    # Copy Next.js standalone output
    COPY --from=builder /app/.next/standalone ./
    COPY --from=builder /app/.next/static ./.next/static
    COPY --from=builder /app/public ./public
    
    # Expose ports
    EXPOSE 80 3000
    
    # Start both Node (Next.js) and NGINX
    CMD sh -c "node server.js & nginx -g 'daemon off;'"
    