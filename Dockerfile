FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .

RUN yarn install

EXPOSE 3000
VOLUME /usr/src/app/src

CMD ["yarn", "start"]
