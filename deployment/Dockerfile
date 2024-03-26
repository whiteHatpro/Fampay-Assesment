FROM node:16

WORKDIR /fampay-assessment

COPY package.json package.json
RUN npm install

ADD . .

ENV SERVICE_NAME "video-service"

ENTRYPOINT [ "node", "index.js" ]