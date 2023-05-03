FROM node:18-buster-slim

RUN apt-get update && \
    apt-get -y install git && \
    apt-get clean

RUN npm i -g @nestjs/cli && npm install -g npm-check-updates