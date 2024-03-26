FROM node:16

WORKDIR /fampay-assessment

COPY package.json package.json
RUN npm install

ADD . .

ENV JOB_NAME "job-fetch-videos"

ENTRYPOINT [ "node", "jobs/fetch-videos/index" ]
