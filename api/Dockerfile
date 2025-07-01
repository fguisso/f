FROM node:22-alpine
WORKDIR /app
COPY . .
RUN apk add openssl
RUN npm install --silent && npx prisma generate
EXPOSE 4000
CMD ["npm", "run", "dev"]
