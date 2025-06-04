FROM node:latest

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y wget \
  && wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz \
  && rm dockerize-linux-amd64-v0.6.1.tar.gz

COPY ./package*.json ./

RUN npm install --force

COPY . .

EXPOSE 3000

CMD ["dockerize", "-wait", "tcp://db:3306", "-timeout", "40s", "npm", "start"]