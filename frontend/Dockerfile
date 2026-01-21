# ---------------- BUILD STAGE ----------------
    FROM node:20-alpine AS builder

    WORKDIR /app
    
    COPY package.json package-lock.json ./
    RUN npm ci
    
    COPY . .
    RUN npm run build
    
    # ---------------- RUNTIME STAGE ----------------
    FROM nginx:alpine
    
    # Remove default nginx config
    RUN rm /etc/nginx/conf.d/default.conf
    
    # Custom nginx config
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    # Copy Next.js standalone build
    COPY --from=builder /app/.next/standalone /app
    COPY --from=builder /app/.next/static /app/.next/static
    COPY --from=builder /app/public /app/public
    
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]