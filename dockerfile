# Node alpine base image
FROM node:23-alpine3.20

WORKDIR   /usr/src/app

RUN npm install -g pnpm


COPY package.json ./
COPY pnpm-lock.yaml ./


RUN pnpm install

COPY . .



EXPOSE 3002

