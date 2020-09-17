FROM node:12.16.1-stretch

RUN mkdir /usr/src/cache
WORKDIR /usr/src/cache

COPY ./package*.json ./
RUN npm ci

RUN mkdir /app
WORKDIR /app
