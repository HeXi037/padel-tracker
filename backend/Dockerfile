FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
# 1. Declare a build-time variable we can set from compose
ARG DATABASE_URL
# 2. Expose it to any command that runs during build
ENV DATABASE_URL=${DATABASE_URL}

RUN npm install
COPY . .
RUN npx prisma generate         
# uses DATABASE_URL when generating client

CMD ["node", "src/index.js"]
