FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Install deps
RUN npm install

COPY . .

# Prisma generate should NOT fail build
RUN npx prisma generate || true

EXPOSE 5000

CMD ["npm", "start"]
