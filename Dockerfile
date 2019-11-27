FROM node:8-alpine
EXPOSE 3000

WORKDIR /var/www/app

COPY package.json /var/www/app
COPY package-lock.json /var/www/app

RUN npm i

COPY . /var/www/app

RUN chmod +x /var/www/app/scripts/start.sh
RUN npm run build

RUN mkdir /var/www/app/dist/src/utils/key

COPY ./src/utils/key/* /var/www/app/dist/src/utils/key/

CMD ["./scripts/start.sh"]
