FROM node:8.3.0-alpine

WORKDIR /src

COPY package.json .

RUN npm i

ADD . .

EXPOSE 8080

# Inject this later
ENV NODE_ENV=production

CMD ["npm", "start"]
