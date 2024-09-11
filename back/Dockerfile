FROM node:16.19.1-alpine

# RUN apt update && apt install -y openssl

WORKDIR /app

COPY package*.json ./

ADD prisma/ ./

ADD .env ./

RUN npm install

RUN npx prisma generate

COPY . .

# RUN npx prisma migrate deploy

# CMD npm run start:dev

CMD ["npm", "run", "start"]
