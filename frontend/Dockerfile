# frontend/Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app

# 1. copy only what we need for `npm install`
COPY package*.json ./

# 2. install *production* deps only
ENV NPM_CONFIG_LOGLEVEL=warn
RUN npm ci

# 3. copy source and build
COPY . .
RUN npm run build

# -- runtime -------------
FROM nginx:1.27-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
