FROM nginx:latest

COPY ./docker/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/nginx-default.conf /etc/nginx/conf.d/default.conf
COPY ./dist /var/www/html

EXPOSE 80