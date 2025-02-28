FROM node:18-alpine as base

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies for development and production
FROM base as development
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

# Build for production
FROM base as builder
RUN npm ci
COPY . .
RUN npm run build

# Production image
FROM node:18-alpine as production
WORKDIR /app

# Copy package files and install only production dependencies
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production

# Copy built application
COPY --from=builder /app/dist ./dist

# Copy necessary files for production
COPY --from=builder /app/.env* ./

# Environment variables with defaults
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "dist/index.js"] 