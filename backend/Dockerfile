# 1. Base image
FROM node:20-alpine

# 2. Set working dir
WORKDIR /app

# 3. Copy files
COPY package*.json ./
RUN npm install

COPY . .

# 4. Build TS
RUN npm run build

# 5. Expose port and start
EXPOSE 4000
CMD ["node", "dist/index.js"]
