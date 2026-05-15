FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN addgroup -g 1001 -S nodegroup && adduser -S nodeuser -u 1001 -G nodegroup || true
USER nodeuser

CMD ["node", "src/bot.js"]
