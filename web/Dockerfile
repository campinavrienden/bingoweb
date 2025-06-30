# ---------- Build Stage ----------
FROM node:20-bullseye AS builder

# Create app directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy source
COPY . .

# Install dependencies and build
RUN pnpm install --frozen-lockfile && pnpm build

# ---------- Production Stage ----------
FROM nginx:stable-alpine AS production

# Copy built files to nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy runtime env injection script and helpers
# COPY entrypoint.sh /app/entrypoint.sh
# COPY scripts /app/scripts

# RUN chmod +x /app/entrypoint.sh

# Copy custom nginx config if needed (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port (default for nginx)
EXPOSE 80
ENTRYPOINT [ "/app/entrypoint.sh" ]
CMD ["nginx", "-g", "daemon off;"]