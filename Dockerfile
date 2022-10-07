FROM node:14 as build

WORKDIR /app
COPY . /app

RUN yarn install
RUN yarn build


FROM nginx:latest as serve

COPY ./docker/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/nginx-default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build ./app/dist /var/www/html

EXPOSE 80
