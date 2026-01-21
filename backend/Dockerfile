# ---------------- BUILD STAGE ----------------
    FROM node:20-alpine AS builder

    WORKDIR /app
    
    COPY package.json package-lock.json ./
    RUN npm ci
    
    COPY . .
    RUN npm run build
    
    # ---------------- RUNTIME STAGE ----------------
    FROM node:20-alpine
    
    WORKDIR /app
    ENV NODE_ENV=production
    
    RUN addgroup -S app && adduser -S app -G app
    
    COPY --from=builder /app/package.json /app/package-lock.json ./
    RUN npm ci --omit=dev
    
    COPY --from=builder /app/dist ./dist
    
    USER app
    EXPOSE 3001
    
    CMD ["node", "dist/main.js"]