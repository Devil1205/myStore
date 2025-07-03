FROM node:lts-alpine3.21

WORKDIR /mystore

COPY ./package*.json ./

COPY ./client ./client
COPY ./server ./server

RUN npm install
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
