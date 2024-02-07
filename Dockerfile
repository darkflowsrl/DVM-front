FROM node:alpine
 
WORKDIR /usr/src/app

RUN apk add --no-cache libc6-compat

COPY . .

RUN npm install

EXPOSE 5173