FROM node:8-alpine
EXPOSE 3000

WORKDIR /var/www/app

COPY package.json /var/www/app
COPY package-lock.json /var/www/app

RUN npm i --production

COPY . /var/www/app

RUN chmod +x /var/www/app/scripts/start.sh
RUN npm run build

RUN rm -rf /var/www/app/src
RUN cp -r /var/www/app/dist/src /var/www/app
RUN rm -rf /var/www/app/dist/*


RUN mkdir /var/www/app/src/utils/key
COPY ./src/utils/key/* /var/www/app/src/utils/key/

ENTRYPOINT [ "/var/www/app/scripts/start.sh" ]

CMD []
