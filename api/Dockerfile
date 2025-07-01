FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm install --silent && npx prisma generate
COPY . .
EXPOSE 4000
CMD ["npm", "run", "dev"]
