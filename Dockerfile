FROM node:20-slim as build

WORKDIR /

COPY package*.json ./

RUN npm i -g pnpm

RUN pnpm install


COPY . .

# Copy the .env file to the container
COPY .env .env


EXPOSE 3000

CMD ["pnpm", "start"]
