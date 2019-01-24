FROM node:11.7.0-alpine

WORKDIR /app
COPY . /app

ENV port 3000

RUN npm install

CMD [ "npm","start" ]
