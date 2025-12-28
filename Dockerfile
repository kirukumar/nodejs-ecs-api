# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

#Copy package files
COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 5000

USER node

CMD ["node", "app.js"]