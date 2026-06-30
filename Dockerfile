FROM node:20-alpine
RUN apk upgrade --no-cache && \
    addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production --ignore-scripts
COPY app.js .
USER appuser
EXPOSE 3000
CMD ["node", "app.js"]
